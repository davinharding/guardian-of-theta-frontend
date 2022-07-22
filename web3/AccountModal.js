import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Image from 'next/image'
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";

import style from "../styles/jss/nextjs-material-kit/modalStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

export default function AccountModal (props) {
  const classes = useStyles();

  const imgUrlKey = {
    '0x74ae2ad6b214bec1a42d3ccd57204c8f9da59924': 'https://iuxdneq2qyubjud6e3ijzocesse2p4okgtjzkej24ljeixqhza.arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/Bobzilla.jpg', //bobzilla
    '0xb8a427267d54c56d6e3763a068d83f6cfd43981e': 'Goldzilla',
    '0x9e2e3025a26a001d1d3857c70b36dcee82e7608d': 'Astrozilla',
    '0xb63a79d06ecbf137002832c7bb14266e25446982': 'https://iuxdneq2qyubjud6e3ijzocesse2p4okgtjzkej24ljeixqhza.arweave.net/RS42khqGKBTQfibQnLhElImn8co-005UROuLSRF4HyM/Firezilla.jpg', //firezilla
    '0xcb58da80df801f000f59cebd9d51f4d50a9bb952': 'Zillarina',
    '0x4e91be87a48f3c37e0f862021d0e24e501f50327': 'Greek God Zilla',
    '0x23b8b352ba1eb43fed713f4c718cc840669cdb5f': 'BarrizanCustoms',
    // '0x3e578abd657cbf4034d685ddbef54c10d9e201c6': 'Davin', // Testing purposes
  };

  return (
    <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal
        }}
        open={props.openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.setOpenModal(false)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            simple
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            onClick={() => props.setOpenModal(false)}
          >
            {" "}
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>My ThetaVibes Wallet</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          {props.nftData.map(e=>{
            return(
              <>
                <div>
                  {e.token}
                </div>
                <div>
                  <img src={imgUrlKey[e.contract]} height="200" width="200"/>
                </div>
              </>
            )
          })}
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button onClick={() => props.setOpenModal(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  )
}