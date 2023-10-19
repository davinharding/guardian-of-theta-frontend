import { useContractFunction } from "@usedapp/core";
import { utils, ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { nftStakingAbi } from "./nftStakingAbi";
import Button from "components/CustomButtons/Button.js";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { contractMetadataKey } from "./ContractMetadataKey";

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

export function DepositButton(props) {
  const classes = useStyles();
  const contractAddress = contractMetadataKey[props.nftAddress].relatedContract;
  const contractInterface = new utils.Interface(nftStakingAbi);
  const contract = new Contract(contractAddress, contractInterface);

  const { state, send } = useContractFunction(contract, "deposit", {
    gasLimitBufferPercentage: 1,
  });
  const { status } = state;

  const execute = () => {
    send([props.tokenId]).then((res) => {
      if (res?.transactionHash) {
        props.setTxnSuccessful(true);
      }
    });
  };

  return (
    <div>
      <Button color="primary" onClick={() => execute()}>
        {status === "PendingSignature" ||
        status === "Mining" ||
        status === "Success" ? (
          <CircularProgress className={classes.progress} size={18} />
        ) : (
          ""
        )}{" "}
        Deposit
      </Button>
      {/* <p>Status: {status}</p> */}
    </div>
  );
}
