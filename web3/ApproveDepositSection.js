import { DepositButton } from "./depositButton"
import { ContractButton } from "./contractButton"
import { contractMetadataKey } from "./ContractMetadataKey"
import { thetaVibesNftAddresses } from "./thetaVibesNftAddresses"
import { useIsApprovedForAll } from "./useIsApprovedForAll"
import { useEthers } from "@usedapp/core";
import { nftContractAbi } from "./nftContractAbi"

const ApproveDepositSection = (props) => {
  const { account } = useEthers();

  function createApprovalKey() { 
    const tempApprovalKey = {};   
    thetaVibesNftAddresses.forEach((e) => {
      tempApprovalKey[e] = useIsApprovedForAll(e, contractMetadataKey[e].stakeContract, account);
    })

    // setApprovalKey(tempApprovalKey);
    return tempApprovalKey
  }

  const approvalKey = createApprovalKey();


  return (
    <>
      {approvalKey[props.contract] ? ( 
        <DepositButton 
          setTxnSuccessful={props.setTxnSuccessful}  
          tokenId={props.token} 
          nftAddress={props.contract}
        />
      ) : ( 
        <ContractButton 
          contractAddress={props.contract}
          abi={nftContractAbi}
          functionName={'setApprovalForAll'}
          buttonTitle={'Approve'}
          sendParameter={contractMetadataKey[props.contract].stakeContract}
          sendParameter2={true}
          setTxnSuccessful={props.setTxnSuccessful} 
          // nftContract={'0x1e9be4b41510cfbe4af40e06829df05bf873d65d'}
        />
      )} 
  </>
  )
}

export { ApproveDepositSection };