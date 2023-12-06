import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Button from "components/CustomButtons/Button.js";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

export const MultiFunctionContractCall = (props) => {
  const classes = useStyles();
  const [callQueue, setCallQueue] = useState([]);
  const [snapshotQueue, setSnapshotQueue] = useState([]);
  const [currentCallIndex, setCurrentCallIndex] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);

  // Initialize the call queue
  useEffect(() => {
    const queue = props.contractCalls.map((call) => {
      const contractInterface = new ethers.utils.Interface(call.abi);
      const contract = new ethers.Contract(call.contractAddress, contractInterface, new ethers.providers.Web3Provider(window.ethereum).getSigner());
      return {
        contract,
        functionName: call.functionName,
        parameters: call.parameters,
      };
    });
    setCallQueue(queue);
  }, [props.contractCalls]);

  // Take a snapshot of the call queue when the button is clicked
  const takeSnapshot = () => {
    setSnapshotQueue([...callQueue]);
    setCurrentCallIndex(0);
  };

  // Execute the next call in the snapshot queue
  useEffect(() => {
    const executeCall = async () => {
      if (currentCallIndex < snapshotQueue.length && !isExecuting) {
        setIsExecuting(true);
        const currentCall = snapshotQueue[currentCallIndex];

        try {
          const transactionResponse = await currentCall.contract[currentCall.functionName](...currentCall.parameters, {
            gasLimit: ethers.utils.hexlify(30000), // Example gas limit
          });

          // Wait for the transaction to be mined
          await transactionResponse.wait();
        } catch (error) {
          console.error("Error executing contract call:", error);
        } finally {
          setIsExecuting(false);
          setCurrentCallIndex(currentIndex => currentIndex + 1);
        }
      }
    };

    if (snapshotQueue.length > 0) {
      executeCall();
    }
  }, [currentCallIndex, snapshotQueue, isExecuting]);

  return (
    <div>
      <Button color="primary" onClick={takeSnapshot}>
        {isExecuting && currentCallIndex < snapshotQueue.length ? (
          <CircularProgress className={classes.progress} size={18} />
        ) : (
          ""
        )}
        {props.buttonTitle}
      </Button>
    </div>
  );
};
