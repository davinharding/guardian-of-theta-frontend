import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "styles/jss/nextjs-material-kit/pages/landingPage.js";

// Sections for this page
import ProductSection from "pages-sections/LandingPage-Sections/ProductSection.js";
import RoadmapSection from "pages-sections/LandingPage-Sections/RoadmapSection.js";

const useStyles = makeStyles(styles);

export default function LandingPageBody(props) {
  const classes = useStyles();

  return (
    <>
      <Parallax filter responsive image="/img/theta-vibes-brick-smaller.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Welcome to ThetaVibes.</h1>
              <h4>
                The intersection of entertainment, music, NFTs and vibes powered
                by the Theta Blockchain.
              </h4>
              <br />
              {/* <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button> */}
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.videoPlayerContainer}>
                <iframe
                  className={classes.iframe}
                  src="https://player.thetavideoapi.com/video/video_mbxnpi3j79yamytfvzt605541c?autoplay=1"
                  border="0"
                  width="100%"
                  height="100%"
                  allow='autoplay'
                  allowFullScreen
                />
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <RoadmapSection />
        </div>
      </div>
    </>
  );
}
