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
    <div className={classes.section}>
      <GridContainer justifyContent="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s talk product</h2>
          <h5 className={classes.description}>
            This should be a paragraph or so outlining the project and explaining its purpose and mission statement.  Depending on the flow we can potentially direct the user to a call to action here which can be a button or a form.  Maybe you want to direct them to thetadrop to buy an nft for example.  The tagline above can also be changed to whatever you want.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="NFTs"
              description="Here let's think about the main features and value propositions of the project ON LAUNCH DAY.  Then on the roadmap section below we can talk about prospective features and goals."
              icon={Palette}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Staking"
              description="Here let's think about the main features and value propositions of the project ON LAUNCH DAY.  Then on the roadmap section below we can talk about prospective features and goals."
              icon={MonetizationOn}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Music"
              description="Here let's think about the main features and value propositions of the project ON LAUNCH DAY.  Then on the roadmap section below we can talk about prospective features and goals."
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
