import { utils } from 'ethers';
import { useCall } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts'
import { nftContractAbi } from './nftContractAbi';

export function useTokenOfOwnerByIndex(
  nftAddress,
  address,
  index
) {
  const nftInterface = new utils.Interface(nftContractAbi);
  const { value, error } =
    useCall(
      address &&
        nftAddress && {
          contract: new Contract(nftAddress, nftInterface), // instance of called contract
          method: 'tokenOfOwnerByIndex', // Method to be called
          args: [address, index], // Method arguments - address to be checked for balance
        }
    ) ?? {};
  if(error) {
    console.log(error.message)
    return undefined
  }
  return value?.[0]
}