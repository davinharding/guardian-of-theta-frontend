import { useState } from "react";
import { ethers } from "ethers";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import axios from "axios"; // Import axios for making API calls

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

const GOTCollectButton = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [apiError, setApiError] = useState(""); // State for API error
  const [txHash, setTxHash] = useState("");
  const { gasLimit } = props;
  const classes = useStyles();
  const contractAddress = props.contractAddress;
  let provider;
  if (window) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }

  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, props.abi, signer);

  const [loading, setLoading] = useState(false);

  const execute = async () => {
    try {
      setLoading(true);

      // Call the API endpoint to update the staked data
      try {
        await axios.get(`/api/amount-staked-updater?address=${props.userAddress}`); // Replace with the correct API endpoint
      } catch (apiErr) {
        setApiError("Failed to update staked data"); // Update API error state
        setLoading(false); // Set loading to false to enable button again
        return; // Exit early if API call fails
      }

      // Construct the transaction object
      let transaction;

      transaction = await contract[props.functionName]({ gasLimit });

      // Wait for the transaction to be mined
      const receipt = await transaction.wait();

      console.log(receipt);

      setTxHash(receipt.transactionHash);

      // Check if the transaction was successful
      if (receipt.status === 1) {
        console.log("Transaction successful!");
      } else {
        console.log("Transaction failed!");
      }
    } catch (error) {
      // Check if the error is due to a revert from a require statement
      if (error.code === ethers.utils.Logger.errors.CALL_EXCEPTION) {
        // Extract the error message from the revert reason
        const errorMessage = error.error?.message || "Transaction failed!";

        // Update the UI with the error message
        console.error("Error executing contract function:", errorMessage);
        console.log(error.receipt, error.transaction.data, error.reason, error.code);
        // ... (any additional error handling if needed)
        setErrorMessage(errorMessage);
        setTxHash(error.transactionHash);
      } else {
        // Handle other errors
        console.error("Error executing contract function:", error);
        console.log(error.receipt);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button color="primary" onClick={() => execute()} disabled={loading}>
        {loading ? <CircularProgress className={classes.progress} size={18} /> : null} {props.buttonTitle}
      </Button>
      {apiError && <p style={{ color: "red" }}>{apiError}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {txHash && 
        <div>View transacion on explorer:{' '}
          <a href={`https://explorer.thetatoken.org/tx/${txHash}`} style={{textDecoration: "none", color: "purple", cursor: "pointer", transition: "color 0.3s, text-decoration 0.3s"}} target="_blank">
            <span style={{textDecoration: "none"}}>{`${txHash.slice(0, 6)}...${txHash.slice(
              txHash.length - 4,
              txHash.length
            )}`}</span>
          </a>
        </div>}
    </div>
  );
};

export default GOTCollectButton;
