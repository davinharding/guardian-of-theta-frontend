import { useContractFunction } from '@usedapp/core'
import { utils, ethers } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { nftStakingAbi } from './nftStakingAbi';

export function DepositButton() {
  const contractAddress = '0x036cF009EF2893718b7C9e0Fc885205125af60eC'
  const contractInterface = new utils.Interface(nftStakingAbi)
  const contract = new Contract(contractAddress, contractInterface)

  const { state, send } = useContractFunction(contract, "deposit", {
    gasLimitBufferPercentage: 1,
  })
  const { status } = state

  const execute = () => {
    
    send([3])
    console.log(state);
  }

  return (
    <div>
      <button onClick={() => execute()}>Deposit</button>
      <p>Status: {status}</p>
    </div>
  )
}