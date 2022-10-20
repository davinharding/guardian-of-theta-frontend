import { useContractFunction } from '@usedapp/core'
import { utils, ethers } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { nftStakingAbi } from './nftStakingAbi';
import Button from "components/CustomButtons/Button.js";

export function WithdrawButton(props) {
  const contractAddress = '0x036cF009EF2893718b7C9e0Fc885205125af60eC'
  const contractInterface = new utils.Interface(nftStakingAbi)
  const contract = new Contract(contractAddress, contractInterface)

  const { state, send } = useContractFunction(contract, "withdraw", {
    gasLimitBufferPercentage: 1,
  })
  const { status } = state

  const execute = () => {
    console.log(props.tokenId)    
    send([props.tokenId])
  }

  return (
    <div>
      <Button color="primary" onClick={() => execute()}>Withdraw</Button>
      <p>Status: {status}</p>
    </div>
  )
}