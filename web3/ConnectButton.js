import { Button, Box, Text } from '@chakra-ui/react';
import { formatEther } from '@ethersproject/units';
import { useEthers } from '@usedapp/core';

export default function ConnectButton({
  handleOpenModal,
  showStoreButton,
  isLoading,
  etherBalance,
  nftData,
  account,
  handleConnectWallet,
  chainId,
}) {
  const { switchNetwork } = useEthers();

  const THETA_CHAIN_ID = 361; // Chain ID for theta network

  const handleNetworkChange = async () => {
    try {
      await switchNetwork(THETA_CHAIN_ID);
    } catch (err) {
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
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return account ? (
    <Box
      display="flex"
      alignItems="center"
      background="gray.700"
      borderRadius="xl"
      py="0"
    >
      {chainId === THETA_CHAIN_ID ? (
        <>
          <Box px="3">
            <Text color="white" fontSize="md" as="div">
              <strong>TFuel: </strong>
              {etherBalance &&
                parseFloat(formatEther(etherBalance)).toFixed(3)}{' '}
              {showStoreButton ? (
                <div>
                  <strong>Barrizan NFT(s): </strong>
                  {nftData.length}
                </div>
              ) : (
                ''
              )}
            </Text>
          </Box>

          <Button
            onClick={handleOpenModal}
            bg="gray.800"
            border="1px solid transparent"
            _hover={{
              border: '1px',
              borderStyle: 'solid',
              borderColor: 'blue.400',
              backgroundColor: 'gray.700',
            }}
            borderRadius="xl"
            m="1px"
            px={3}
            height="38px"
          >
            <Text color="white" fontSize="xs" fontWeight="medium" ml="2" mr="2">
              {account &&
                `✅ ${account.slice(0, 6)}...${account.slice(
                  account.length - 4,
                  account.length
                )}`}
            </Text>
          </Button>
        </>
      ) : (
        <Button
          onClick={handleNetworkChange}
          bg="red.500"
          color="brand.100"
          fontSize="lg"
          fontWeight="medium"
          borderRadius="xl"
          border="1px solid transparent"
          _hover={{
            borderColor: 'brand.300',
            color: 'brand.600',
          }}
          _active={{
            backgroundColor: 'brand.100',
            borderColor: 'brand.200',
          }}
        >
          😵 Wrong Network!
        </Button>
      )}
    </Box>
  ) : (
    <Button
      onClick={handleConnectWallet}
      bg="brand.200"
      color="brand.100"
      fontSize="lg"
      fontWeight="medium"
      borderRadius="xl"
      border="1px solid transparent"
      _hover={{
        borderColor: 'brand.300',
        color: 'brand.500',
      }}
      _active={{
        backgroundColor: 'brand.100',
        borderColor: 'brand.200',
      }}
    >
      Connect to a wallet
    </Button>
  );
}
