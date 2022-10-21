import { useContractFunction } from '@usedapp/core'
import { utils, ethers } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { nftStakingAbi } from './nftStakingAbi';
import Button from "components/CustomButtons/Button.js";


export function DepositButton(props) {
  const contractAddress = '0x036cF009EF2893718b7C9e0Fc885205125af60eC'
  const contractInterface = new utils.Interface(nftStakingAbi)
  const contract = new Contract(contractAddress, contractInterface)

  const { state, send } = useContractFunction(contract, "deposit", {
    gasLimitBufferPercentage: 1,
  })
  const { status } = state

  const execute = () => {
    
    send([props.tokenId])
    console.log(state);
  }

  return (
    <div>
      <Button color="primary" onClick={() => execute()}>Deposit</Button>
      <p>Status: {status}</p>
    </div>
  )
}