import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Speaker from "@material-ui/icons/Speaker";
import CheckCircle from "@material-ui/icons/CheckCircle";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Storefront from "@material-ui/icons/Storefront";
import LiveTv from "@material-ui/icons/LiveTv";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function RoadmapSection() {
  const classes = useStyles();
  return (
    <div id="roadmap">
      <div className={classes.section}>
        <GridContainer justifyContent="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Vibemap</h2>
            <h5 className={classes.description}>
              Subject to change
            </h5>
          </GridItem>
        </GridContainer>
      </div>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: '#ffa50d', color: '#1A120Dff' }}
          contentArrowStyle={{ borderRight: '7px solid  #ffa50d' }}
          iconStyle={{ background: '#9c27b0', color: '#ffffff' }}
          icon={<MonetizationOn />}
        >
          <h3 className="vertical-timeline-element-title">NFT Staking for TVIBE ✅ </h3>
          {/* <h4 className="vertical-timeline-element-subtitle">Q3 2022</h4> */}
          <p>
          Stake your Theta Vibes NFTs to stack $TVIBE and spend it in our store!
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: '#9c27b0', color: '#ffffff' }}
          contentStyle={{ background: '#ffa50d', color: '#1A120Dff' }}
          contentArrowStyle={{ borderRight: '7px solid  #ffa50d' }}
          icon={<LiveTv />}
        >
          <h3 className="vertical-timeline-element-title">Members only live streams and chat ✅</h3>
          {/* <h4 className="vertical-timeline-element-subtitle">Q4 2022</h4> */}
          <p>
          Join the Discord to verify membership for access to live performances and VIP giveaways!
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2008 - 2010"
          contentStyle={{ background: '#ffa50d', color: '#1A120Dff' }}
          iconStyle={{ background: '#9c27b0', color: '#ffffff' }}
          contentArrowStyle={{ borderRight: '7px solid  #ffa50d' }}
          icon={<Storefront />}
        >
          <h3 className="vertical-timeline-element-title">$TVIBE only Merch Store ✅</h3>
          {/* <h4 className="vertical-timeline-element-subtitle">Q4 2022</h4> */}
          <p>
          Stake your Theta Vibes NFTs and earn $TVIBE to redeem limited edition merch, NFTs, and more.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: '#9c27b0', color: '#ffffff' }}
          contentArrowStyle={{ borderRight: '7px solid  #ffa50d' }}
          contentStyle={{ background: '#ffa50d', color: '#1A120Dff' }}
          icon={<Speaker />}
        >
          <h3 className="vertical-timeline-element-title">8k 2D/ 8k 3D 180° VR Content and Live Performances / Theta DRM ✅</h3>
          {/* <h4 className="vertical-timeline-element-subtitle">Q4 2022</h4> */}
          <p>
          Join us in Discord and verify membership to watch live performances with us! We plan to shoot all types of entertaining content. Click the Content tab at the top of the page to view our 8k 3D 180° content!
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: '#9c27b0', color: '#ffffff' }}
          contentArrowStyle={{ borderRight: '7px solid  #29cad2' }}
          contentStyle={{ background: '#29cad2', color: '#1A120Dff' }}
          icon={<Speaker />}
        >
          <h3 className="vertical-timeline-element-title">Sony Spatial Reality Display 3D NFTS</h3>
          {/* <h4 className="vertical-timeline-element-subtitle">Q1 2023</h4> */}
          <p>
          Use your $TVIBE to redeem for 3D NFTs!
          </p>
        </VerticalTimelineElement>        
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: '#9c27b0', color: '#ffffff' }}
          contentArrowStyle={{ borderRight: '7px solid  #29cad2' }}
          contentStyle={{ background: '#29cad2', color: '#1A120Dff' }}
          icon={<Speaker />}
        >
          <h3 className="vertical-timeline-element-title">DeThetaFi Integration</h3>
          {/* <h4 className="vertical-timeline-element-subtitle">Q1 2023</h4> */}
          <p>
          Use your Theta Vibes NFTs to access dethetafi.xyz
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: '#9c27b0', color: '#ffffff' }}
          contentArrowStyle={{ borderRight: '7px solid  #29cad2' }}
          contentStyle={{ background: '#29cad2', color: '#1A120Dff' }}
          icon={<Speaker />}
        >
          <h3 className="vertical-timeline-element-title">Gworld/Metaverse Integration</h3>
          {/* <h4 className="vertical-timeline-element-subtitle">Q1 2023</h4> */}
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: '#9c27b0', color: '#ffffff' }}
          contentArrowStyle={{ borderRight: '7px solid  #29cad2' }}
          contentStyle={{ background: '#29cad2', color: '#1A120Dff' }}
          icon={<Speaker />}
        >
          <h3 className="vertical-timeline-element-title">12k 3D 360° VR Content and Live Performances</h3>
          {/* <h4 className="vertical-timeline-element-subtitle">Q1 2023</h4> */}
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          iconStyle={{ background: '#2ab8e6', color: '#fff' }}
          icon={<CheckCircle />}
        />
      </VerticalTimeline>
    </div>
  );
}
