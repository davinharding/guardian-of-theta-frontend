import { makeStyles } from "@material-ui/core/styles";
import videoView from "../styles/jss/nextjs-material-kit/pages/video-view";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { rewardTokenAddress } from "../web3/rewardTokenAddress";
import { contractMetadataKey } from "../web3/ContractMetadataKey";


const useStyles = makeStyles(videoView);

export default function VideoView(props) {
  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  let tvibeBalance = useTokenBalance(rewardTokenAddress, account); 

  const handleConnectWallet = () => {
    activateBrowserWallet();
  };

  const classes = useStyles();

  const { ...rest } = props;

  const stubCommentData = [
    {
      author: "John Doe",
      date: "1 week ago",
      text: "This song is so catchy! I can't stop listening to it.",
      replies: [
        {
          author: "Jane Smith",
          date: "6 days ago",
          text: "Same here! I've had it on repeat all day.",
        },
        {
          author: "Mike Brown",
          date: "5 days ago",
          text: "Definitely one of my new favorites.",
        },
      ],
    },
    {
      author: "Alice Johnson",
      date: "3 days ago",
      text: "The visuals in this music video are stunning!",
      replies: [],
    },
    {
      author: "David Miller",
      date: "2 days ago",
      text: "I love the message behind this song. So inspiring!",
      replies: [
        {
          author: "Emma Wilson",
          date: "1 day ago",
          text: "Agreed, the lyrics are so powerful.",
        },
      ],
    },
    {
      author: "Lucy Davis",
      date: "1 day ago",
      text: "Just discovered this artist, can't wait to hear more!",
      replies: [],
    },
    {
      author: "Jack Green",
      date: "1 day ago",
      text: "The chorus of this song is so uplifting!",
      replies: [
        {
          author: "Olivia White",
          date: "1 day ago",
          text: "I love how it makes me feel like I'm flying!",
        },
        {
          author: "Sophia Clark",
          date: "20 hours ago",
          text: "The melody is so memorable, I can't get it out of my head!",
        },
      ],
    },
    {
      author: "Ella Turner",
      date: "1 day ago",
      text: "Amazing collaboration! Their voices blend so well together.",
      replies: [
        {
          author: "Ethan Thompson",
          date: "23 hours ago",
          text: "I hope they work together again in the future.",
        },
      ],
    },
    {
      author: "Liam Wright",
      date: "22 hours ago",
      text: "This music video is a masterpiece! The cinematography is top-notch.",
      replies: [],
    },
    {
      author: "Mia Young",
      date: "21 hours ago",
      text: "Fly N High just became my new favorite song!",
      replies: [
        {
          author: "Amelia Hill",
          date: "18 hours ago",
          text: "I can't believe I hadn't heard it before! It's so good.",
        },
      ],
    },
  ];  

  return (
    <div className={classes.container}>
      <Header
        absolute
        color="transparent"
        brand="ThetaVibes"
        rightLinks={
          <HeaderLinks
          account={account} 
          handleConnectWallet={handleConnectWallet} 
          etherBalance={etherBalance}
          tvibeBalance={tvibeBalance}
          chainId={chainId}
          contractMetadataKey={contractMetadataKey}
          />}
        {...rest}
      />

      <main className={classes.main}>
        <div className={classes.leftContainer}>

          <section className={classes.videoPlayer}>
            {/* Replace with your video player component */}
            <div className={classes.videoPlayerContainer}>
              <iframe
                src="https://player.thetavideoapi.com/video/video_6xvpbwus075k8xtxr73arj3vmy"
                width="100%"
                height="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
                allow="autoplay; fullscreen"
                frameBorder="0"
              />
            </div>
          </section>

          <section className={classes.videoInfo}>
            <h2>Video Title</h2>
            <div className={classes.videoStats}>
              <span className={classes.videoStatsSpan}>123K views</span>
              <span className={classes.videoStatsSpan}>•</span>
              <span className={classes.videoStatsSpan}>1 month ago</span>
            </div>
            {/* Add other video details and interactions, such as like/dislike buttons, share, etc. */}
          </section>

          <section className={classes.authorInfo}>
            <h3>Author Name</h3>
            <p>Author description or channel information</p>
            {/* Add other author details and interactions, such as subscribe button, etc. */}
          </section>
          <section className={classes.commentsSection}>
            <h2>Comments</h2>
            {/* Replace with your comments data */}
            {stubCommentData.map((comment, index) => (
              <div key={`comment-${index}`} className={classes.comment}>
                <p className={classes.commentAuthor}>{comment.author}</p>
                <p className={classes.commentDate}>{comment.date}</p>
                <p className={classes.commentText}>{comment.text}</p>
                {comment.replies.map((reply, replyIndex) => (
                  <div key={`reply-${replyIndex}`} className={`${classes.comment} ${classes.reply}`}>
                    <p className={classes.commentAuthor}>{reply.author}</p>
                    <p className={classes.commentDate}>{reply.date}</p>
                    <p className={classes.commentText}>{reply.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </section>
        </div>


        <aside className={classes.sidebar}>
          <h2>Up next</h2>
          <ul className={classes.videoList}>
            {/* Replace with your suggested video data */}
            <li className={classes.videoListItem}>
              <a href="#">
                <img className={classes.videoListItemImg} src="/img/bg.jpg" alt="Video thumbnail" />
                <div>
                  <h3>Video Title</h3>
                  <p>Author Name</p>
                  <p>123K views</p>
                </div>
              </a>
            </li>
            {/* Add more suggested video items */}
          </ul>
        </aside>
      </main>

      <footer className={classes.footer}>
        <p>My YouTube-like Platform &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
