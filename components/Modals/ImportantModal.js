import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";
import style from "../../styles/jss/nextjs-material-kit/modalStyle.js";
import Image from 'next/image.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

export default function ImportantModal (props) {
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
          <h4 className={classes.modalTitle}>Important Information (Especially if it's your first time)</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <ul>
            <li>
              <div>
                <span>
                  <a href="https://explorer.thetatoken.org/account/0x14e4c61d6aa9accda3850b201077cebf464dcb31" target="_blank"> TVIBE Contract: 0x14e4c61d6aa9accda3850b201077cebf464dcb31</a>
                </span>
              </div>
            </li>
            <li>
              <a href="https://swap.thetatoken.org/swap?tokenAddressInput=0x4dc08b15ea0e10b96c41aec22fab934ba15c983e&tokenAddressOutput=0x14e4c61d6aa9accda3850b201077cebf464dcb31">Thetaswap link to buy $TVIBE</a> 
            </li>
            <li>
              Before you are able to transact with the staking contract you will need to give it access to your NFTs via an approval transaction.
            </li>
            <li>
              This approval transaction covers the entirety of each collection so if you have multiples of an NFT you will only need to approve once.
            </li>
            <li>
              You may not be familiar with how this type of transaction will appear in your metamask wallet, for your safety metamask explicitly (and accurately) states in red that the approval is for the entire collection (see screenshot)
              <div className={classes.infoImages}>
                <Image src="/img/approval_screenshot_message.png" height="140%" width="200%" />
                <Image src="/img/approval_screenshot_buttons.png" height="140%" width="200%" />
              </div>              
            </li>
            <li>
              This messaging is completely normal and expected.  To be clear you are granting access ONLY for the staking contract to be able to transfer your nfts to and from your wallet when you click the deposit and withdraw buttons.  
            </li>
            <li>
              THIS APPROVAL ONLY AFFECTS YOUR THETA VIBES NFTS AND NOTHING ELSE.
            </li>
            <li>
              If you have further questions or comments please drop them in our <a target="_blank" href="https://discord.gg/HwYDfUCJRD">discord</a>.  We greatly appreciate any and all feedback.  Thanks!
            </li>
          </ul>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button onClick={() => props.setOpenModal(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  )
}