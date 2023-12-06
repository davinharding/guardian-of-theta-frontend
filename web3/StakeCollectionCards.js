import React, { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { stakedNftAddresses } from "./stakedNftAddresses";
import { StakeCollectionCard } from "./StakeCollectionCard";
import { MultiFunctionContractCall } from "./MultiFunctionContractCall";
import { makeStyles } from "@material-ui/core/styles";
import { nftStakingAbi } from "./nftStakingAbi";

const useStyles = makeStyles({
  collectAllButton: {
    textAlign: "center",
  },
});

const fetcher = (url) => axios.get(url).then((res) => res.data);

const StakeCollectionCards = (props) => {
  const [contractCalls, setContractCalls] = useState([]);
  const classes = useStyles();
  let commaStr = stakedNftAddresses.join(",");

  const { data } = useSWR(
    `https://www.thetascan.io/api/721/?address=${props.account}&multicontract=${commaStr}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    if (data) {
      const calls = data.reduce((acc, e) => {
        const contractIndex = acc.findIndex(
          (c) => c.contractAddress === e.contract
        );
        if (contractIndex >= 0) {
          acc[contractIndex].parameters[0].push(e.token);
        } else {
          acc.push({
            contractAddress: e.contract,
            abi: nftStakingAbi,
            functionName: "claimRewards",
            parameters: [[e.token]], // Array of an array, since parameters expects an array
          });
        }
        return acc;
      }, []);

      setContractCalls(calls);
    }
  }, [data]);

  if (!data) {
    return null;
  }

  console.log("contractCalls", contractCalls)

  return (
    <>
      <div className={classes.collectAllButton}>
        <MultiFunctionContractCall
          contractCalls={contractCalls}
          buttonTitle={"Collect All Unclaimed"}
        />
      </div>
      <span>
        {data.map((e, idx) => (
          <StakeCollectionCard
            key={idx}
            token={e}
            idx={idx}
            setTxnSuccessful={props.setTxnSuccessful}
            staked={props.staked}
          />
        ))}
      </span>
    </>
  );
};

export { StakeCollectionCards };
