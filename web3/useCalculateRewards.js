import { utils } from 'ethers';
import { useCall } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts'
import { nftStakingAbi } from './nftStakingAbi';
export function useCalculateRewards(
  nftAddress,
  address,
  tokenIdArray
) {
  const nftInterface = new utils.Interface(nftStakingAbi);
  const { value, error } =
    useCall(
      address &&
        nftAddress && {
          contract: new Contract(nftAddress, nftInterface), // instance of called contract
          method: 'calculateRewards', // Method to be called
          args: [address, tokenIdArray], // Method arguments - address to be checked for balance
        }
    ) ?? {};
  if(error) {
    console.log(error.message)
    return undefined
  }
  return value?.[0]
}