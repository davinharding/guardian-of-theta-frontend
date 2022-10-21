import { React, useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { Contract } from '@ethersproject/contracts'
import { utils, ethers } from 'ethers';
import { ContractButton } from "../web3/contractButton";
import { DepositButton } from "../web3/depositButton";
import { MintButton } from "../web3/mintButton";
import { nftStakingAbi } from "../web3/nftStakingAbi";
import { nftContractAbi } from "../web3/nftContractAbi";
import { formatEther } from '@ethersproject/units'
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import axios from 'axios';
import { useReadFunction } from "../web3/useReadFunction";
import { useTokenOfOwnerByIndex } from "../web3/useTokenOfOwnerByIndex";
import { useCalculateRewards } from "../web3/useCalculateRewards";

import styles from "styles/jss/nextjs-material-kit/pages/loginPage.js";
import { WithdrawButton } from "../web3/withdrawButton";

const useStyles = makeStyles(styles);

export default function StakingPage(props) {
  const [nftData, setNftData] = useState([]);
  const [nfts, setNfts] = useState(0)
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const tvibeBalance = useTokenBalance('0xefd424dfcc47e74a23175713f3e4c3493877f192', account);

  // DAVIN: PULL OUT ALL CONSTANT VARIABLES INTO THEIR OWN FILE OR FOLDER

  const THETA_VIBES_NFT_ADDRESSES = [
    "0xcd8ee3078fa8565135f1e17974e04a6fbabedd66", // Guardian
    "0x1E9BE4b41510cfBe4af40E06829Df05BF873D65d", // Test Guardian
    "0x1a54ff4a92daf67eafb9a790d596b9794e2d27a8", // Fly N High
    "0xa07965551c88df408594139ac23c778cf54e25f4", // Down with Me
    "0x4c7d0a83d59bd47219cd5ca980047d38de07686c", // Dreamland
    "0xf20687fc0a0c6e6bb20cfb7334bc2bac20ff57c0", // Beam My Line
    "0x2b1dc7c56d17702a53a8adbc158b073b60dd9be1", // gimme the tfuel
  ];

  const STAKED_NFT_ADDRESSES = [
    '0x036cF009EF2893718b7C9e0Fc885205125af60eC', // Test Guardian
  ]

  const UNSTAKED_NFT_ADDRESSES = [
    '0x1e9be4b41510cfbe4af40e06829df05bf873d65d', // Test Guardian
  ]

  function getStakedNfts(contractAddresses, accountAddress) {
    let returnArr = [];
    contractAddresses.forEach(contractAddress => {
      const currentTokensDeposited = useReadFunction(contractAddress, accountAddress, nftStakingAbi, 'depositsOf');
      if(currentTokensDeposited){
        Object.values(currentTokensDeposited).forEach(tokenId => {
          returnArr.push({ 
            contract: contractAddress,
            token: parseInt(tokenId),
          });
        }); 
      }
         
    });
    return returnArr;
  };
  
  const stakedNfts = getStakedNfts(STAKED_NFT_ADDRESSES, account);
  
  function getUnstakedNfts(contractAddresses, accountAddress) {
    let returnArr = [];
    contractAddresses.forEach(contractAddress => {
      const rawNumberOfNFts = useReadFunction(contractAddress, accountAddress, nftStakingAbi, 'balanceOf');
      const numberOfNfts = parseInt(rawNumberOfNFts);
      // if(numberOfNfts) {
        for(let i=0; i < 1; i++) {
          const tokenId = useTokenOfOwnerByIndex(contractAddress, accountAddress, i);
          returnArr.push({
            token: parseInt(tokenId),
            contract: contractAddress,
          });
        // }; 
      }    
    });
    return returnArr;
  };
  
  // const unstakedNfts = getUnstakedNfts(UNSTAKED_NFT_ADDRESSES, account);
  function createTokenIdArray(stakedNfts) {
    let tokenIdArray = [];
    stakedNfts.forEach(e => {
      tokenIdArray.push(e.token);
    })
    return tokenIdArray;
  }

  const tokenIdArray = createTokenIdArray(stakedNfts);
  
  function calculateUnclaimedRewards(tokenIdArray) {
    const bigNumberArray = useCalculateRewards(STAKED_NFT_ADDRESSES[0], account, tokenIdArray);

    let answer = 0;
    if(bigNumberArray) {
      bigNumberArray.forEach(e => {
        answer += ethers.utils.formatEther(parseInt(e).toString());
      })
    }
    
    return answer;
  }

  // DAVIN: needs to be changed to check all six contract addresses and not just one
  const unclaimedRewards = calculateUnclaimedRewards(tokenIdArray);

  function getNFTsForContract(contractAddresses, accountAddress) {
    const nfts = [];
    contractAddresses.forEach((address) => {
      axios
        .get(
          `https://www.thetascan.io/api/721/?address=${accountAddress}&contract=${address}`
        )
        .then((response) => {
          // handle success
          if (response.data) {
            response.data.forEach((nE) => {
              // console.log(response.data, 'test');
              nfts.push(nE);
            });
          }
        })
        .catch((error) => {
          // handle error
          setNftData([]);
          // eslint-disable-next-line no-console
          console.error(error);
        });
    });
    setNftData(nfts);
  }

  useEffect(() => {
    getNFTsForContract(THETA_VIBES_NFT_ADDRESSES, account);
    
  }, [account]);
  const handleConnectWallet = () => {
    activateBrowserWallet();
  };
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="NextJS Material Kit"
        rightLinks={
          <HeaderLinks
          account={account} 
          handleConnectWallet={handleConnectWallet} 
          etherBalance={etherBalance}
          tvibeBalance={tvibeBalance}
          chainId={chainId}
          imgUrlKey={props.imgUrlKey}
          />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/thetavibes-neon.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={6} md={12}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Staking Menu</h4>
                </CardHeader>
                <CardBody>
                <div>
                  TVIBE Balance: {tvibeBalance && 
                  parseFloat(formatEther(tvibeBalance)).toFixed(3)} 
                </div>   
                <div>
                  Unclaimned TVIBE Balance: {unclaimedRewards && 
                  parseFloat(unclaimedRewards).toFixed(3)} 
                </div> 
                  {nftData.map((e,idx)=>{
                    return(
                      <div key={idx} style={{marginTop: "3rem"}}>                
                        <Card className={classes.stakingCard}>
                          <CardHeader color="primary">
                            {props.imgUrlKey[e.contract].name} #{e.token}
                          </CardHeader>
                          <CardBody>
                            <img src={props.imgUrlKey[e.contract].url} height="100%" width="100%"/>
                          </CardBody>
                          <CardFooter>
                            <Button color="primary">
                              Stake
                            </Button> 
                          </CardFooter>     
                        </Card>
                      </div>
                    )
                  })}
{/*                   
                  {unstakedNfts.map((e,idx)=>{
                    return(                      
                      <div key={idx} style={{marginTop: "3rem"}}>       
                        <Card className={classes.stakingCard}>
                          <CardHeader color="primary">
                            {props.imgUrlKey[e.contract].name} #{e.token}
                          </CardHeader>
                          <CardBody>
                            <img src={props.imgUrlKey[e.contract].url} height="100%" width="100%"/>
                          </CardBody>
                          <CardFooter>
                            <DepositButton tokenId={e.token} /> 
                          </CardFooter>     
                        </Card>
                      </div>
                    )
                  })} */}
                  <div style={{marginTop: "3rem"}}>  
                    {stakedNfts.map((e,idx)=>{
                      return(                                      
                        <Card className={classes.stakingCard}>
                          <CardHeader color="primary">
                            {props.imgUrlKey[e.contract].name} #{e.token}
                          </CardHeader>
                          <CardBody>
                            <img key={idx} src={props.imgUrlKey[e.contract].url} height="100%" width="100%"/>
                          </CardBody>
                          <CardFooter>
                            <WithdrawButton tokenId={e.token} />
                          </CardFooter>     
                        </Card>                        
                      )
                    })}
                  </div>
                  
                  <Button color="primary">
                    Collect
                  </Button> 
                  <ContractButton 
                    contractAddress={'0x036cF009EF2893718b7C9e0Fc885205125af60eC'}
                    abi={nftStakingAbi}
                    functionName={'updateRewardRate'}
                    buttonTitle={'Update rewardRate'}
                  />
                  <ContractButton 
                    contractAddress={'0x036cF009EF2893718b7C9e0Fc885205125af60eC'}
                    abi={nftStakingAbi}
                    functionName={'setERC721Address'}
                    buttonTitle={'Set ERC721 Address'}
                    sendParameter={'0x1e9be4b41510cfbe4af40e06829df05bf873d65d'}
                  />
                  <ContractButton 
                    contractAddress={'0x1e9be4b41510cfbe4af40e06829df05bf873d65d'}
                    abi={nftStakingAbi}
                    functionName={'setApprovalForAll'}
                    buttonTitle={'Set Approval'}
                    sendFunction={('0x036cF009EF2893718b7C9e0Fc885205125af60eC', true)}
                    // nftContract={'0x1e9be4b41510cfbe4af40e06829df05bf873d65d'}
                  />
                  <MintButton account={account} />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  {/* <Button simple color="primary" size="lg">
                    Get started
                  </Button> */}
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
