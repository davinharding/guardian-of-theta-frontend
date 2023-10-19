import { useContractFunction } from "@usedapp/core";
import { utils, ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import Button from "components/CustomButtons/Button.js";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { stakedNftAddresses } from "./stakedNftAddresses";
import { useState } from "react";

const useStyles = makeStyles({
  progress: {
    color: "white",
    marginRight: "1rem",
  },
  iconWrapper: {
    display: "block",
    marginRight: "0rem !important",
  },
});

export function MultipleTxnButton(props) {
  const [currentStatus, setCurrentStatus] = useState("");
  const classes = useStyles();
  const contractInterface = new utils.Interface(props.abi);

  function createTokenIdObject(nfts) {
    let tokenIdObj = {
      "0x67fc8c72707f17761ced1e71ee9a92be36179eac": [], // Staked Guardian
      "0x76d39587003800215059070dc1e36d5e939da0ac": [], // Staked Down With Me
      // fill in with the other 4 contracts
    };
    nfts.forEach((e) => {
      tokenIdObj[e.contract].push(parseInt(e.token));
    });
    return tokenIdObj;
  }

  const stakedTokenObj = createTokenIdObject(props.stakedNftData);

  const startTxnChain = () => {
    stakedNftAddresses
      .forEach((address) => {
        const contract = new Contract(address, contractInterface);

        const { state, send } = useContractFunction(
          contract,
          props.functionName,
          {
            gasLimitBufferPercentage: 100,
          }
        );
        const { status } = state;

        setCurrentStatus(status);

        const execute = () => {
          send(stakedTokenObj[address]);
        };
        execute();
      })
      .then((res) => {
        if (res?.transactionHash) {
          props.setTxnSuccessful(true);
        }
      });
  };

  return (
    <div>
      <Button color="primary" onClick={() => startTxnChain()}>
        {currentStatus === "PendingSignature" || currentStatus === "Mining" ? (
          <CircularProgress className={classes.progress} size={18} />
        ) : (
          ""
        )}{" "}
        {props.buttonTitle}
      </Button>
      {/* <p>Status: {status}</p> */}
    </div>
  );
}
