import { utils } from "ethers";
import { useCall } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { nftContractAbi } from "./nftContractAbi";

export function useIsApprovedForAll(nftAddress, nftStakingAddress, account) {
  const nftInterface = new utils.Interface(nftContractAbi);
  const { value, error } =
    useCall(
      account &&
        nftAddress && {
          contract: new Contract(nftAddress, nftInterface), // instance of called contract
          method: "isApprovedForAll", // Method to be called
          args: [account, nftStakingAddress], // Method arguments - owner address and operator/stakingContract address
        }
    ) ?? {};
  if (error) {
    console.log(error.message);
    return undefined;
  }
  return value?.[0];
}
