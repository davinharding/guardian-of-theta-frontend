import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.js";
import ConnectButton from "../../web3/ConnectButton";
import AccountModal from "../../web3/AccountModal";
import styles from "styles/jss/nextjs-material-kit/components/headerLinksStyle.js";
import Link from "next/link";
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { tvibeTokenAddress } from "../../web3/addressConstants";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const { activateBrowserWallet, account, chainId } = useEthers();
  const [openModal, setOpenModal] = useState(false);
  const tvibeBalance = useTokenBalance(tvibeTokenAddress, account);
  const etherBalance = useEtherBalance(account);

  const classes = useStyles();

  const handleConnectWallet = () => {
    activateBrowserWallet();
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link href="/#product" as="/#product">
          <Button color="transparent" className={classes.navLink}>
            <Icon className={classes.icons}>info</Icon> About
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/#roadmap" as="/#roadmap">
          <Button color="transparent" className={classes.navLink}>
            <Icon className={classes.icons}>map</Icon> Vibemap
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/staking" as="/staking">
          <Button color="transparent" className={classes.navLink}>
            <Icon className={classes.icons}>currency_exchange</Icon> Staking
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/entertainment" as="/entertainment">
          <Button color="transparent" className={classes.navLink}>
            <Icon className={classes.icons}>play_circle</Icon> Entertainment
          </Button>
        </Link>
      </ListItem>
      {/* <ListItem className={classes.listItem}>
        <Link href="/collect-got" as="/collect-got">
          <Button
            color="transparent"
            className={classes.navLink}
          >
            <Icon className={classes.icons}>paid</Icon> Collect $GOT
          </Button>
        </Link>
      </ListItem> */}
      <ListItem className={classes.listItem}>
        <a
          href="https://discord.gg/HwYDfUCJRD"
          as="https://discord.gg/HwYDfUCJRD"
          target="_blank"
        >
          <Button color="transparent" className={classes.navLink}>
            <i className={classes.socialIcons + " fab fa-discord"} />
          </Button>
        </a>
      </ListItem>
      <ListItem className={classes.listItem}>
        <a
          href="https://twitter.com/ThetaVibesNFTs"
          as="https://twitter.com/ThetaVibesNFTs"
          target="_blank"
        >
          <Button color="transparent" className={classes.navLink}>
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </a>
      </ListItem>
      <ListItem className={classes.listItem}>
        <a
          href="https://www.facebook.com/profile.php?id=100087533539947"
          as="https://www.facebook.com/profile.php?id=100087533539947"
          target="_blank"
        >
          <Button color="transparent" className={classes.navLink}>
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </a>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ConnectButton
          tooltipClasses={{ tooltip: classes.tooltip }}
          navLinkClasses={classes.connectButton}
          handleConnectWallet={handleConnectWallet}
          account={account}
          chainId={chainId}
          setOpenModal={setOpenModal}
        />
        <AccountModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          account={account}
          contractMetadataKey={props.contractMetadataKey}
          etherBalance={etherBalance}
          tvibeBalance={tvibeBalance}
        />
      </ListItem>
    </List>
  );
}
