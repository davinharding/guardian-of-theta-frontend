import LandingPageBody from "../pages-sections/LandingPage-Sections/LandingPageBody"
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

const dashboardRoutes = [];

const Index = (props) => {

  const { ...rest } = props;
  return(
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Theta Vibes"
        rightLinks={
          <HeaderLinks 
            account={account} 
            etherBalance={etherBalance}
            chainId={chainId}
            contractMetadataKey={props.contractMetadataKey}
            page={'index'}
          />
        }
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <LandingPageBody />
      <Footer />
    </div>
  )
};

export default Index;
