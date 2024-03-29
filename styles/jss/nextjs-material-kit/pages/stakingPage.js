import { container } from "styles/jss/nextjs-material-kit.js";

const signupPageStyle = {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: "#FFFFFF",
    paddingBottom: "200px",
  },
  backgroundOverflow: {
    background: "linear-gradient(0deg, #8e24aa, black)",
    borderRadius: "0px 0px 5px 5px",
    height: "100%",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 1)",
    zIndex: "0",
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)",
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)",
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""',
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF",
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%",
    },
  },
  form: {
    margin: "0",
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px",
  },
  socialIcons: {
    maxWidth: "24px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center",
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important",
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0",
  },
  inputIconsColor: {
    color: "#495057",
  },
  stakingCard: {
    width: "31%",
    display: "inline-block",
    marginRight: ".5rem",
    marginLeft: ".5rem",
  },
  stakingButton: {
    display: "inline-block",
    marginRight: "1rem",
  },
  progress: {
    textAlign: "center",
    fontSize: "1.3rem",
  },
  center: {
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    margin: "1rem",
    fontSize: "1.25rem",
  },
  border: {
    border: "2px solid purple",
    borderRadius: "5px",
    padding: "1rem",
    margin: "0.5rem",
  },
  tokenValues: {
    textAlign: "center",
    fontSize: "1.5rem",
  },
  fitContent: {
    width: "fit-content",
    display: "inline-block",
    textAlign: "center",
    marginRight: ".5rem",
    marginLeft: ".5rem",
  },
  icon: {
    // color: "purple",
    fontSize: "1rem",
    verticalAlign: "middle",
    transform: "scale(1.5)",
  },
  iconText: {
    fontSize: "1.2rem",
    marginLeft: ".5rem",
  },
  iconGroup: {
    textAlign: "center",
    paddingBottom: "15px",
  },
  bold: {
    color: "purple",
    fontSize: "2rem",
  },
  spacer: {
    paddingTop: "1rem",
  },
  "@media only screen and (max-width: 960px)": {
    stakingCard: {
      display: "flex",
      width: "100%",
      marginTop: "3rem",
    },
  },
};

export default signupPageStyle;
