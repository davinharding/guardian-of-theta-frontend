import { useState } from "react";
import { ethers } from "ethers";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";

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

export const EthersContractButton = (props) => {
    const { gasLimit } = props;
    const classes = useStyles();
    const contractAddress = props.contractAddress;
    let provider;
    if(window) {
       provider = new ethers.providers.Web3Provider(window.ethereum);
    } 

    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, props.abi, signer);

    const [loading, setLoading] = useState(false);

    const execute = async () => {
        try {
        setLoading(true);

        // Construct the transaction object
        let transaction;

        if (props.sendParameter2) {
            transaction = await contract[props.functionName](props.sendParameter, props.sendParameter2, { gasLimit });
        } else {
            transaction = await contract[props.functionName](props.sendParameter, { gasLimit });
        }

        // Wait for the transaction to be mined
        const receipt = await transaction.wait();

        // Check if the transaction was successful
        if (receipt.status === 1) {
            console.log("Transaction successful!");
        } else {
            console.log("Transaction failed!");
        }
        } catch (error) {
        console.error("Error executing contract function:", error);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div>
        <Button color="primary" onClick={() => execute()} disabled={loading}>
            {loading ? <CircularProgress className={classes.progress} size={18} /> : null} {props.buttonTitle}
        </Button>
        </div>
    );
};
