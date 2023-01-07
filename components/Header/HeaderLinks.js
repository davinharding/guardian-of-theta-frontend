import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.js";
import ConnectButton from "../../web3/ConnectButton";
import AccountModal from "../../web3/AccountModal";
import styles from "styles/jss/nextjs-material-kit/components/headerLinksStyle.js";
import Link from "next/link"

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link href="/#product" as="/#product">
          <Button
            color="transparent"
            className={classes.navLink}
          >
            <Icon className={classes.icons}>info</Icon> About
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/#roadmap" as="/#roadmap">
          <Button
            color="transparent"
            className={classes.navLink}
          >
            <Icon className={classes.icons}>map</Icon> Vibemap
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/staking" as="/staking">
          <Button
            color="transparent"
            className={classes.navLink}
          >
            <Icon className={classes.icons}>currency_exchange</Icon> Staking
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ConnectButton
          tooltipClasses={{ tooltip: classes.tooltip }}
          navLinkClasses={classes.connectButton}
          handleConnectWallet={props.handleConnectWallet}
          account={props.account}
          chainId={props.chainId}
          setOpenModal={setOpenModal}
        />
        <AccountModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          account={props.account}
          contractMetadataKey={props.contractMetadataKey}
          etherBalance={props.etherBalance}
          tvibeBalance={props.tvibeBalance}
        />
      </ListItem>
    </List>
  );
}
