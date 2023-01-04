import { useContractFunction } from '@usedapp/core'
import { utils, ethers } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import Button from "components/CustomButtons/Button.js";
import { CircularProgress } from '@material-ui/core';
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

export function ContractButton(props) {
  const classes = useStyles();
  const contractAddress = props.contractAddress 
  const contractInterface = new utils.Interface(props.abi)
  const contract = new Contract(contractAddress, contractInterface)

  const { state, send } = useContractFunction(contract, props.functionName, {
    gasLimitBufferPercentage: 100,
  })
  const { status } = state

  const execute = () => {
    if(props.sendParameter2){
      send(props.sendParameter, props.sendParameter2).then((res) => {
        if (res?.transactionHash) {
          props.setTxnSuccessful(true);
        }
      });
    }else{
      send(props.sendParameter)
    }
    
    console.log(state);
  }

  return (
    <div>
      <Button color="primary" onClick={() => execute()}>
      {status === 'PendingSignature' || status === 'Mining' ? (
        <CircularProgress className={classes.progress} size={18}/>
        ) : (
          ''
        )}{' '}
        {props.buttonTitle}
      </Button>
      {/* <p>Status: {status}</p> */}
    </div>
  )
}