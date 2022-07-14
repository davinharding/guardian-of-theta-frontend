/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "styles/jss/nextjs-material-kit/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
             <ListItem className={classes.inlineBlock}>
              <Tooltip
                id="twitter-tooltip"
                title="Follow us on twitter"
                placement={"top"}
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  href=""
                  target="_blank"
                  color="transparent"
                  className={classes.navLink}
                >
                  <i className={classes.socialIcons + " fab fa-twitter"} />
                </Button>
              </Tooltip>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Tooltip
                id="facebool-tooltip"
                title="Follow us on facebook"
                placement={"top"}
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  color="transparent"
                  href=""
                  target="_blank"
                  className={classes.navLink}
                >
                  <i className={classes.socialIcons + " fab fa-facebook"} />
                </Button>
              </Tooltip>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Tooltip
                id="discord-tooltip"
                title="Follow us on discord"
                placement={"top"}
                classes={{ tooltip: classes.tooltip }}
              >
                <Button
                  color="transparent"
                  href=""
                  target="_blank"
                  className={classes.navLink}
                >
                  <i className={classes.socialIcons + " fab fa-discord"} />
                </Button>
              </Tooltip>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} Theta Vibes
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
