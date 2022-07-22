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


const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const [nftData, setNftData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  // const imgUrlKey = {
  //   '0xcd8ee3078fa8565135f1e17974e04a6fbabedd66': {
  //     url: 'https://cq4btd6fkvsbcjmg6qywqut4tjiov2gvgbgcyfugeiq24gi.arweave.net/FDgZj8VVZBElhvQxaFJ8mlDq6N_-UwT_CwWhiI-hrhk',
  //     name: "Guardian"
  //   },
  //   '0x1a54ff4a92daf67eafb9a790d596b9794e2d27a8': {
  //     url: 'https://mvy4bnetjgdfdxj7ay6mzfpewhfoochmsllgxj3yrfs4e4idwu.arweave.net/ZXHAtJNJhlHdPwY8zJXks-crnCOyS1muneIllwnEDtY',
  //     name: "Fly N High"
  //    }, 
  //    '0xa07965551c88df408594139ac23c778cf54e25f4': {
  //     url: 'https://hcllyblpadi6hqjsdxdcvm7xvng3otlxoixkwbziilagxotaoy.arweave.net/OJa8BW_8A0ePBMh3GKrP3q023TXdyLqsHKELAa7pgdg',
  //     name: "Down with Me"
  //    }, 
  //    '0x4c7d0a83d59bd47219cd5ca980047d38de07686c': {
  //     url: 'https://mcfzzovh2ackan55luk5fp3n6zemmoivtwqfjf6oj5uwtppzoe.arweave.net/YIucuqfQBKA3vV0V0r9t9kjGO_RWdoFSXzk9pab35cU',
  //     name: "Dreamland"
  //    }, 
  //    '0xf20687fc0a0c6e6bb20cfb7334bc2bac20ff57c0': {
  //     url: 'https://karbabo3vw43es7nijruppndmojjjixquhmyj53xcw5i3pu65m.arweave.net/UCIQBdutub-JL7UJjR72jY5KUovCh2YT3dxW6jb6e60',
  //     name: "Beam My Line"
  //    }, 
  //   '0x2b1dc7c56d17702a53a8adbc158b073b60dd9be1': {
  //     url: 'https://oqm2vlnadma7ahuo73lryxqqc5d4dhfdb2dycqw44rsz7tl2.arweave.net/dBmq-raAbAfAejv7XHF4QF0fBnKMOh4F_C3ORln8160',
  //     name: "Gimme the TFuel"
  //   },
  // };

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
      getNFTsForContract(THETA_VIBES_NFT_ADDRESSES, props.account);
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
        <AccountModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          nftData={nftData}
          account={props.account}
          imgUrlKey={props.imgUrlKey}
        />
      </ListItem>
    </List>
  );
}
