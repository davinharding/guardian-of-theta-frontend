/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";

// core components
import Button from "components/CustomButtons/Button.js";
import ConnectButton from "../../web3/ConnectButton";
import AccountMoadal from "../../web3/AccountModal";

import styles from "styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const [openModal, setOpenModal] = React.useState(false);
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="#product"
          color="transparent"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>info</Icon> About
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#roadmap"
          color="transparent"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>map</Icon> Vibemap
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/staking"
          color="transparent"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>currency_exchange</Icon> Staking
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ConnectButton
          tooltipClasses={{ tooltip: classes.tooltip }}
          navLinkClasses={classes.navLink}
          handleConnectWallet={props.handleConnectWallet}
          account={props.account}
          chainId={props.chainId}
          setOpenModal={setOpenModal}
        />
        <AccountMoadal
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </ListItem>
    </List>
  );
}
