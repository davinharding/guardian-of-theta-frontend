import Button from "../components/CustomButtons/Button.js";
import Tooltip from "@material-ui/core/Tooltip";
import { useEthers } from '@usedapp/core';

export default function ConnectButton(props) {
  const { switchNetwork } = useEthers();

  const THETA_CHAIN_ID = 361; // Chain ID for theta network
  // const THETA_TESTNET_CHAIN_ID = 365; // Chain ID for theta network

  const handleNetworkChange = async () => {
      await switchNetwork(THETA_CHAIN_ID);
      const provider = window.ethereum;
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x169',
            chainName: 'Theta Mainnet',
            rpcUrls: ['https://eth-rpc-api.thetatoken.org/rpc'],
            blockExplorerUrls: ['https://explorer.thetatoken.org/'],
            nativeCurrency: {
              symbol: 'TFUEL', // 2-6 characters long
              decimals: 18,
            },
          },
        ],
      });
  };
  
  return props.account ? (    
    props.chainId === THETA_CHAIN_ID ? (
      <Button
        color="primary"
        href=""
        target="_blank"
        className={props.navLinkClasses}
        onClick={() => props.setOpenModal(true)}
      >
      {props.account &&
        `✅ ${props.account.slice(0, 6)}...${props.account.slice(
          props.account.length - 4,
          props.account.length
        )}`}
      </Button> 
    ) : (
      <Button
        color="primary"
        href=""
        target="_blank"
        className={props.navLinkClasses}
        onClick={handleNetworkChange}
      >
        😵 Wrong Network!
      </Button>
    )       
  ) : (
    <Tooltip
      id="wallet-tooltip"
      title="Connect your Theta wallet"
      placement={"top"}
      classes={props.tooltipClasses}
    >     
      <Button
        color="primary"
        href=""
        target="_blank"
        className={props.navLinkClasses}
        onClick={props.handleConnectWallet}
      >Connect
      </Button>   
    </Tooltip>
  )
}