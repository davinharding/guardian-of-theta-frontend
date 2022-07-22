import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.js";
import ConnectButton from "../../web3/ConnectButton";
import AccountMoadal from "../../web3/AccountModal";
import styles from "styles/jss/nextjs-material-kit/components/headerLinksStyle.js";
import axios from "axios";


const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const [nftData, setNftData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  const BARRIZAN_NFT_ADDRESSES = [
    "0x74ae2ad6b214bec1a42d3ccd57204c8f9da59924",
    "0xb8a427267d54c56d6e3763a068d83f6cfd43981e",
    "0x9e2e3025a26a001d1d3857c70b36dcee82e7608d",
    "0xb63a79d06ecbf137002832c7bb14266e25446982",
    "0xcb58da80df801f000f59cebd9d51f4d50a9bb952",
    "0x4e91be87a48f3c37e0f862021d0e24e501f50327",
    "0x23b8b352ba1eb43fed713f4c718cc840669cdb5f",
  ];

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
    if (props.account) {
      getNFTsForContract(BARRIZAN_NFT_ADDRESSES, props.account);
    }
  }, [props.account]);

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/#product"
          color="transparent"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>info</Icon> About
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/#roadmap"
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
          nftData={nftData}
          account={props.account}
        />
      </ListItem>
    </List>
  );
}
