const videoView = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#1A120D",
    color: "#ffffff", // Light text color
  },
  header: {
    // Add your header styles
  },
  videoPlayerContainer: {
    position: "relative",
    paddingBottom: "56.25%", // 16:9 aspect ratio
    height: 0,
    overflow: "hidden",
  },  
  main: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    padding: "1rem",
    marginTop: "120px", // Add this line to move the main content below the header
  },
  leftContainer: {
    flex: 3,
    marginRight: "1rem",
  },
  videoPlayer: {
    flex: 3,
    marginRight: "1rem",
  },
  videoInfo: {
    marginTop: "1rem",
  },
  authorInfo: {
    fontSize: "0.9rem",
  },
  videoStats: {
    display: "flex",
    fontSize: "0.9rem",
    color: "#999", // Lighter gray for stats
  },
  videoStatsSpan: {
    marginRight: "0.5rem",
  },
  sidebar: {
    flex: 1,
  },
  videoList: {
    listStyleType: "none",
    padding: 0,
  },
  videoListItem: {
    display: "flex",
    marginBottom: "1rem",
  },
  videoListItemImg: {
    width: "128px",
    height: "72px",
    objectFit: "cover",
  },
  footer: {
    backgroundColor: "#1A120D", // Dark background color
    color: "#ffffff", // Light text color
    padding: "1rem",
  },
  commentsSection: {
    marginTop: "1rem",
    backgroundColor: "#27241F",
    borderRadius: "5px",
    padding: "1rem",
  },
  
  comment: {
    marginBottom: "1rem",
    borderBottom: "1px solid #3c3c3c",
    paddingBottom: "0.5rem",
  },
  
  commentAuthor: {
    fontWeight: "bold",
  },
  
  commentDate: {
    fontSize: "0.8rem",
    color: "#999",
  },
  reply: {
    marginLeft: "1rem",
    borderLeft: "1px solid #3c3c3c",
    paddingLeft: "0.5rem",
  },
  commentText: {
    marginTop: "0.5rem",
  },  
};

export default videoView;
