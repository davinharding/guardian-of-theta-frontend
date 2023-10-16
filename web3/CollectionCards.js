import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody"
import CardFooter from "components/Card/CardFooter"
import CardHeader from "components/Card/CardHeader"
import useSWR, { mutate } from 'swr';
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/pages/stakingPage.js";
import { contractMetadataKey } from "./ContractMetadataKey";
import { WithdrawButton } from "./withdrawButton";
import { ContractButton } from "./contractButton";
import { nftStakingAbi } from "./nftStakingAbi";
import { ApproveDepositSection } from "./ApproveDepositSection";
import { nftContractAbi } from "./nftContractAbi";
import { thetaVibesNftAddresses } from "./thetaVibesNftAddresses";

const useStyles = makeStyles(styles);

const fetcher = url => axios.get(url).then(res => res.data);

const CollectionCards = (props) => {
  const classes = useStyles();

  let commaStr = '';

  thetaVibesNftAddresses.forEach((e) => {
    commaStr += e + ",";
  })

  const { data } = useSWR(`https://www.thetascan.io/api/721/?address=${props.account}&multicontract=${commaStr}`, fetcher, { refreshInterval: 1000});

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
                  <img src={
                    // below handles the Lil Monsters contract which has unique images for each NFT whereas all the others use the same image
                    e.contract === "0xde402d4deff8cea11f515a7bef886277b32cbc5a" ? contractMetadataKey[e.contract].url + e.token + '.png' 
                    :
                    contractMetadataKey[e.contract].url
                    } height="100%" width="100%"/>
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

export { CollectionCards };