import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Palette from "@material-ui/icons/Palette";
import MusicNote from "@material-ui/icons/MusicNote";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section} id="product">
      <GridContainer justifyContent="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>What is ThetaVibes?</h2>
          <h5 className={classes.description}>
          The Theta Vibes NFT project is about collaborating with different musical and graphical artists to create entertaining video NFTs on the Theta blockchain. We were born out of our love for Theta and utilizing its tehnology, and will continue to push the boundaries of what is possible along side them. Pick up a Theta Vibes NFT today only on <a target="_blank" rel="noreferrer"href="https://opentheta.io/explore">Opentheta.io</a>! Follow the link and search "Theta Vibes" to mint or buy an NFT from the genesis collection.  From there you can start staking, and enjoying our endless gallery of 4k 2D, and 8k 3D 180° VR content (Coming soon!).
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="NFTs"
              description="We love to feature artists who are Theta enthusiasts that we already know within our community, however we are not limted to that.  If you would like to be featured in our next drop please reach out to us!"
              icon={Palette}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Staking"
              description="Stake your Theta Vibes NFT's to start earning our native TNT20 token $TVIBE! $TVIBE can be used to redeem limited edition NFTs, merch, 2D/3D content and more! (Comning soon!)"
              icon={MonetizationOn}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Content"
              description="4k 2D and 8k 3D 180° music, comedy, and entertainment featuring artists from the Ohio area and beyond.  Connect your Theta wallet and click on the Entertainment tab  to view the library. (Coming soon!)"
              icon={MusicNote}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
