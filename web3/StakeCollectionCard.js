import { contractMetadataKey } from "./ContractMetadataKey";
import { WithdrawButton } from "./withdrawButton";
import { ContractButton } from "./contractButton";
import { nftStakingAbi } from "./nftStakingAbi";
import { ApproveDepositSection } from "./ApproveDepositSection";
import { nftContractAbi } from "./nftContractAbi";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
import styles from "styles/jss/nextjs-material-kit/pages/stakingPage.js";
import { makeStyles } from "@material-ui/core/styles";
import { useCalculateRewards } from "./useCalculateRewards";
import { useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { useEffect, useState } from "react";
import commaNumber from "comma-number";

const useStyles = makeStyles(styles);

const StakeCollectionCard = (props) => {
  const { account } = useEthers();
  const [pendingRewards, setPendingRewards] = useState(0);

  const classes = useStyles();

  const bigNumberRewards = useCalculateRewards(props.token.contract, account, [
    props.token.token,
  ]);
  useEffect(() => {
    if (bigNumberRewards) {
      setPendingRewards(formatEther(bigNumberRewards[0]));
    }
  }, [account, bigNumberRewards]);

  return (
    <span key={props.idx} style={{ marginTop: "3rem" }}>
      <Card className={classes.stakingCard}>
        <CardHeader color="primary">
          {contractMetadataKey[props.token.contract].name} #{props.token.token}
        </CardHeader>
        <CardBody>
          <img
            src={
              // below handles the Staked Lil Monsters contract which has unique images for each NFT whereas all the others use the same image
              props.token.contract ===
              "0x2f9ce5a469ed1cc8ae353b55b40432c8c1745153"
                ? contractMetadataKey[props.token.contract].url +
                  props.token.token +
                  ".png"
                : contractMetadataKey[props.token.contract].url
            }
            height="100%"
            width="100%"
          />
          <div style={{ fontSize: "1rem", textAlign: "center"}}>
            <span style={{ color: "purple" }}>Unclaimed TVIBE</span>: {pendingRewards &&
              commaNumber(parseFloat(pendingRewards).toFixed(3))}
          </div>
        </CardBody>
        <CardFooter className={classes.center}>
          {props.staked ? (
            <>
              <WithdrawButton
                setTxnSuccessful={props.setTxnSuccessful}
                tokenId={props.token.token}
                nftAddress={props.token.contract}
              />
              <ContractButton
                contractAddress={props.token.contract}
                abi={nftStakingAbi}
                functionName={"claimRewards"}
                buttonTitle={"Collect"}
                sendParameter={[props.token.token]}
              />
            </>
          ) : (
            <ApproveDepositSection
              setTxnSuccessful={props.setTxnSuccessful}
              contract={props.token.contract}
              abi={nftContractAbi}
              functionName={"setApprovalForAll"}
              buttonTitle={"Approve"}
              sendParameter={
                contractMetadataKey[props.token.contract].relatedContract
              }
              sendParameter2={true}
              token={props.token.token}
            />
          )}
        </CardFooter>
      </Card>
    </span>
  );
};

export { StakeCollectionCard };
