import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Flag from "@material-ui/icons/Flag";
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
              Can add some text here explaining the vibemap or remove this entirely.
            </h5>
          </GridItem>
        </GridContainer>
      </div>
      <VerticalTimeline
        lineColor="gray"
      >
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: '#5A94A5ff', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  #5A94A5ff' }}
          date="2011 - present"
          iconStyle={{ background: '#5A94A5ff', color: '#fff' }}
          icon={<Flag />}
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
          iconStyle={{ background: '#5A94A5ff', color: '#fff' }}
          contentStyle={{ background: '#5A94A5ff', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  #5A94A5ff' }}
          icon={<Flag />}
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
          contentStyle={{ background: '#5A94A5ff', color: '#fff' }}
          iconStyle={{ background: '#5A94A5ff', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  #5A94A5ff' }}
          icon={<Flag />}
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
          iconStyle={{ background: '#5A94A5ff', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  #5A94A5ff' }}
          contentStyle={{ background: '#5A94A5ff', color: '#fff' }}
          icon={<Flag />}
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
          iconStyle={{ background: '#5A94A5ff', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  #5A94A5ff' }}
          contentStyle={{ background: '#5A94A5ff', color: '#fff' }}
          icon={<Flag />}
        >
          <h3 className="vertical-timeline-element-title">Metaverse Concerts</h3>
          <h4 className="vertical-timeline-element-subtitle">Q1 2023</h4>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          iconStyle={{ background: '#A93E24ff', color: '#fff' }}
          icon={<CheckCircle />}
        />
      </VerticalTimeline>
    </div>
  );
}
