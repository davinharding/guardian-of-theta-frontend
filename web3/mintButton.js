import { useContractFunction } from '@usedapp/core'
import { utils, ethers } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { nftContractAbi } from './nftContractAbi'
import Button from "components/CustomButtons/Button.js"

export function MintButton(props) {
  const contractAddress = '0x1e9be4b41510cfbe4af40e06829df05bf873d65d' 
  const contractInterface = new utils.Interface(nftContractAbi)
  const contract = new Contract(contractAddress, contractInterface)

  const { state, send } = useContractFunction(contract, 'safeMint', {
    gasLimitBufferPercentage: 1,
  })
  const { status } = state

  const execute = () => {    
    send(props.account, { value: ethers.utils.parseEther("1")})
  }

  return (
    <div>
      <Button color="primary"  onClick={() => execute()}>Mint 1 NFT</Button>
      <p>Status: {status}</p>
    </div>
  )
}