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
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody"
import CardFooter from "components/Card/CardFooter"
import CardHeader from "components/Card/CardHeader"
import { formatEther } from '@ethersproject/units';
import style from "../styles/jss/nextjs-material-kit/modalStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

export default function AccountModal (props) {
  const classes = useStyles();

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
          <h4 className={classes.modalTitle}>My Wallet</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          TFUEL Balance: {props.etherBalance && 
            parseFloat(formatEther(props.etherBalance)).toFixed(3)} 
          <div>
            TVIBE Balance: {props.tvibeBalance && 
            parseFloat(formatEther(props.tvibeBalance)).toFixed(3)} 
          </div>          
          {props.nftData.map((e, idx)=>{
            return(
              <div key={idx} style={{textAlign: "center", marginTop: "3rem"}}>
                  <Card>
                    <CardHeader color="primary">
                      {props.contractMetadataKey[e.contract].name} #{e.token}
                    </CardHeader>
                    <CardBody>
                      <img src={props.contractMetadataKey[e.contract].url} height="100%" width="100%"/>
                    </CardBody>
                    <CardFooter>
                      {/* <Button color="primary">
                        Stake
                      </Button>  */}
                    </CardFooter>     
                  </Card>
              </div>
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