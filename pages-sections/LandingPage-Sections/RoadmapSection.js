import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Speaker from "@material-ui/icons/Speaker";
import CheckCircle from "@material-ui/icons/CheckCircle";
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
          contentStyle={{ background: '#AAFCFBff', color: '#1A120Dff' }}
          contentArrowStyle={{ borderRight: '7px solid  #AAFCFBff' }}
          date="2011 - present"
          iconStyle={{ background: '#AAFCFBff', color: 'gray' }}
          icon={<Speaker />}
        >
          <h3 className="vertical-timeline-element-title">Website Launch</h3>
          <h4 className="vertical-timeline-element-subtitle">Q3 2022</h4>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2010 - 2011"
          iconStyle={{ background: '#AAFCFBff', color: 'gray' }}
          contentStyle={{ background: '#AAFCFBff', color: '#1A120Dff' }}
          contentArrowStyle={{ borderRight: '7px solid  #AAFCFBff' }}
          icon={<Speaker />}
        >
          <h3 className="vertical-timeline-element-title">Staking Phase 1</h3>
          <h4 className="vertical-timeline-element-subtitle">Q4 2022</h4>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2008 - 2010"
          contentStyle={{ background: '#AAFCFBff', color: '#1A120Dff' }}
          iconStyle={{ background: '#AAFCFBff', color: 'gray' }}
          contentArrowStyle={{ borderRight: '7px solid  #AAFCFBff' }}
          icon={<Speaker />}
        >
          <h3 className="vertical-timeline-element-title">Swag Merch Store!</h3>
          <h4 className="vertical-timeline-element-subtitle">Q4 2022</h4>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2006 - 2008"
          iconStyle={{ background: '#AAFCFBff', color: 'gray' }}
          contentArrowStyle={{ borderRight: '7px solid  #AAFCFBff' }}
          contentStyle={{ background: '#AAFCFBff', color: '#1A120Dff' }}
          icon={<Speaker />}
        >
          <h3 className="vertical-timeline-element-title">TVIBE NFT Marketplace</h3>
          <h4 className="vertical-timeline-element-subtitle">Q4 2022</h4>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2006 - 2008"
          iconStyle={{ background: '#AAFCFBff', color: 'gray' }}
          contentArrowStyle={{ borderRight: '7px solid  #FFEB81ff' }}
          contentStyle={{ background: '#FFEB81ff', color: '#1A120Dff' }}
          icon={<Speaker />}
        >
          <h3 className="vertical-timeline-element-title">Metaverse Concerts</h3>
          <h4 className="vertical-timeline-element-subtitle">Q1 2023</h4>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          iconStyle={{ background: '#FFEB81ff', color: '#fff' }}
          icon={<CheckCircle />}
        />
      </VerticalTimeline>
    </div>
  );
}
