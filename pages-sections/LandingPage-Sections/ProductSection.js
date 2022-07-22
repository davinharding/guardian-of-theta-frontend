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
          The Theta Vibes NFT project is about collaborating with different musical and graphical artists to create entertaining video NFTs on the Theta blockchain. We were born out of our love for Theta and utilizing its tehnology, and will continue to push the boundaries of what is possible along side them. Pick up a Theta Vibes NFT today only on <a target="_blank" rel="noreferrer"href="https://opentheta.io/explore">Opentheta.io</a>! Follow the link and search "Theta Vibes" to mint or buy and NFT from the genesis collection.  From there you can start staking as well as enjoy our endless gallery of 4k 3D 360° VR content exclusively for Theta Vibes holders.
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
              description="Stake your Theta Vibes NFT's to start earning our native token $TVIBE!  $TVIBE will be used in our merch store to redeem limited edition NFTs, merch, and more!"
              icon={MonetizationOn}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Content"
              description="ThetaVibes NFTs are your ticket to exclusive 4k 2D and 4k 3D 360° music experiences! Connect your Theta wallet and click on the content tab to view our ever expanding library!"
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
