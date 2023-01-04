import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.js";
import ConnectButton from "../../web3/ConnectButton";
import AccountModal from "../../web3/AccountModal";
import styles from "styles/jss/nextjs-material-kit/components/headerLinksStyle.js";
import axios from "axios";
import Link from "next/link"


const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const [nftData, setNftData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  const THETA_VIBES_NFT_ADDRESSES = [
    "0xcd8ee3078fa8565135f1e17974e04a6fbabedd66", // Guardian
    "0x1a54ff4a92daf67eafb9a790d596b9794e2d27a8", // Fly N High
    "0xa07965551c88df408594139ac23c778cf54e25f4", // Down with Me
    "0x4c7d0a83d59bd47219cd5ca980047d38de07686c", // Dreamland
    "0xf20687fc0a0c6e6bb20cfb7334bc2bac20ff57c0", // Beam My Line
    "0x2b1dc7c56d17702a53a8adbc158b073b60dd9be1", // gimme the tfuel
  ];

  function getNFTsForContract(contractAddresses, accountAddress) {
    const nfts = [];
    if(props.chainId === 361) { // Theta Mainnet
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
    }
    setNftData(nfts);
  }

  useEffect(() => {
    if (props.account) {
      getNFTsForContract(THETA_VIBES_NFT_ADDRESSES, props.account);
    }
  }, [props.account]);

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
          nftData={nftData}
          account={props.account}
          contractMetadataKey={props.contractMetadataKey}
          etherBalance={props.etherBalance}
          tvibeBalance={props.tvibeBalance}
        />
      </ListItem>
    </List>
  );
}
