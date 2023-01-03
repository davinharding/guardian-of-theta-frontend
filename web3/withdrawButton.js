import { useContractFunction } from '@usedapp/core'
import { utils, ethers } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { nftStakingAbi } from './nftStakingAbi';
import Button from "components/CustomButtons/Button.js";
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { stakeGuardianAddress } from './StakeGuardianAddresss';

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

export function WithdrawButton(props) {
  const classes = useStyles();
  const contractAddress = stakeGuardianAddress
  const contractInterface = new utils.Interface(nftStakingAbi)
  const contract = new Contract(contractAddress, contractInterface)

  const { state, send } = useContractFunction(contract, "withdraw", {
    gasLimitBufferPercentage: 1,
  })
  const { status } = state

  const execute = () => {
    send([props.tokenId]).then((res) => {
      if (res?.transactionHash) {
        props.setTxnSuccessful(true);
      }
    });
  }

  return (
    <div>
      <Button color="primary" onClick={() => execute()}>
        {status === 'PendingSignature' || status === 'Mining' ? (
          <CircularProgress className={classes.progress} size={18}/>
          ) : (
            ''
          )}{' '}
        Withdraw
      </Button>
      {/* <p>Status: {status}</p> */}
    </div>
  )
}