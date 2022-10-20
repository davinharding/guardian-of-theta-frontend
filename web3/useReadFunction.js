import { utils } from 'ethers';
import { useCall } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts'

export function useReadFunction(
  nftAddress,
  address,
  nftAbi,
  functionName
) {
  const nftInterface = new utils.Interface(nftAbi);
  const { value, error } =
    useCall(
      address &&
        nftAddress && {
          contract: new Contract(nftAddress, nftInterface), // instance of called contract
          method: functionName, // Method to be called
          args: [address], // Method arguments - address to be checked for balance
        }
    ) ?? {};
  if(error) {
    console.log(error.message)
    return undefined
  }
  return value?.[0]
}