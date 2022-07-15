import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Palette from "@material-ui/icons/Palette";
import MusicNote from "@material-ui/icons/MusicNote";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function RoadmapSection() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer justifyContent="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Vibemap</h2>
          <h5 className={classes.description}>
            Can add some text here explaining the vibemap or remove this entirely.
          </h5>
        </GridItem>
      </GridContainer>
      <VerticalTimeline
        lineColor="gray"
      >
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date="2011 - present"
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<MonetizationOn />}
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
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          icon={<MonetizationOn />}
        >
          <h3 className="vertical-timeline-element-title">Art Director</h3>
          <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
          <p>
            Creative Direction, User Experience, Visual Design, SEO, Online Marketing
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2008 - 2010"
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          icon={<MonetizationOn />}
        >
          <h3 className="vertical-timeline-element-title">Web Designer</h3>
          <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
          <p>
            User Experience, Visual Design
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2006 - 2008"
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<MonetizationOn />}
        >
          <h3 className="vertical-timeline-element-title">Web Designer</h3>
          <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
          <p>
            User Experience, Visual Design
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="April 2013"
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
          icon={<Palette />}
        >
          <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
          <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
          <p>
            Strategy, Social Media
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="November 2012"
          contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          icon={<Palette />}
        >
          <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
          <h4 className="vertical-timeline-element-subtitle">Certification</h4>
          <p>
            Creative Direction, User Experience, Visual Design
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="2002 - 2006"
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
          icon={<Palette />}
        >
          <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
          <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
          <p>
            Creative Direction, Visual Design
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
          icon={<MusicNote />}
        />
      </VerticalTimeline>
    </div>
  );
}
