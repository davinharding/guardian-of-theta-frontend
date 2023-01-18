import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody"
import CardFooter from "components/Card/CardFooter"
import CardHeader from "components/Card/CardHeader"
import useSWR, { mutate } from 'swr';
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/pages/loginPage.js";
import { contractMetadataKey } from "./ContractMetadataKey";
import { WithdrawButton } from "./withdrawButton";
import { ContractButton } from "./contractButton";
import { nftStakingAbi } from "./nftStakingAbi";
import { ApproveDepositSection } from "./ApproveDepositSection";
import { nftContractAbi } from "./nftContractAbi";
import { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles(styles);

const fetcher = url => axios.get(url).then(res => res.data);

const StakeCollectionCards = (props) => {
  const classes = useStyles();
  const { data } = useSWR(`https://www.thetascan.io/api/721/?address=${props.account}&contract=${props.stakedNftContract}`, fetcher, { refreshInterval: 10000});

  // console.log(props.nftContract, data, props.staked)

  if (!data) {
    return null;
  }

  return (
    <span>  
      {data.map((e,idx) => {
          return (
            <span key={idx} style={{marginTop: "3rem"}}>       
              <Card className={classes.stakingCard}>
                <CardHeader color="primary">
                  {contractMetadataKey[e.contract.toLowerCase()].name} #{e.token}
                </CardHeader>
                <CardBody>
                  <img src={contractMetadataKey[e.contract].url} height="100%" width="100%"/>
                </CardBody>
                <CardFooter className={classes.center}>
                  {props.staked ? (
                    <>
                      <WithdrawButton
                        setTxnSuccessful={props.setTxnSuccessful} 
                        tokenId={e.token}
                        nftAddress={e.contract} 
                      />
                      <ContractButton
                        contractAddress={e.contract}
                        abi={nftStakingAbi}
                        functionName={'claimRewards'}
                        buttonTitle={'Collect'}
                        sendParameter={[e.token]} 
                      />
                    </> 
                    ) : (
                      <ApproveDepositSection
                        setTxnSuccessful={props.setTxnSuccessful} 
                        contract={e.contract}
                        abi={nftContractAbi}
                        functionName={'setApprovalForAll'}
                        buttonTitle={'Approve'}
                        sendParameter={contractMetadataKey[e.contract].relatedContract}
                        sendParameter2={true}
                        token={e.token}
                      /> 
                    )
                  }
                  
                </CardFooter>     
              </Card>
            </span>
          )        
        })
      }      
    </span>  
  )
}

export { StakeCollectionCards };