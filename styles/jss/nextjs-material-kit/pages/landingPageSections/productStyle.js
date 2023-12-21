import { Block } from "@material-ui/icons";
import { title } from "styles/jss/nextjs-material-kit.js";

const productStyle = {
  section: {
    padding: "70px 0",
    textAlign: "center",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    color: "#AAFCFBff",
  },
  description: {
    color: "#999",
  },
  roadmapItems: {
    display: "block",
  },
  roadmapBg: {
    backgroundColor: "#D3D3D3",
  },
};

export default productStyle;
