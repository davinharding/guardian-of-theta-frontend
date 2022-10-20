import { useContractFunction } from '@usedapp/core'
import { utils, ethers } from 'ethers'
import { Contract } from '@ethersproject/contracts'

export function ContractButton(props) {
  const contractAddress = props.contractAddress 
  const contractInterface = new utils.Interface(props.abi)
  const contract = new Contract(contractAddress, contractInterface)

  const { state, send } = useContractFunction(contract, props.functionName, {
    gasLimitBufferPercentage: 100,
  })
  const { status } = state

  const execute = () => {
    
    send(props.sendParameter)
    console.log(state);
  }

  return (
    <div>
      <button onClick={() => execute()}>{props.buttonTitle}</button>
      <p>Status: {status}</p>
    </div>
  )
}