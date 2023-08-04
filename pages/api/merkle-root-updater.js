import axios from 'axios';
import { keccak256, toBuffer } from 'ethereumjs-util';
import { MerkleTree } from 'merkletreejs';
import { ethers } from 'ethers';
import { GOTDistributorAddress } from '../../web3/addressConstants';
import { GOTDistributorAbi } from '../../web3/GOTDistributorAbi';

export default async function handler(_request, response) {
  async function getStakeByAddress(address) {
    const response = await axios.get(`https://explorer.thetatoken.org:8443/api/stake/${address}`);
    // console.log('response.data.body', response.data.body)
    return response.data;
  }

  async function getStakedAddresses(nodeAddress) {
    const stakeData = await getStakeByAddress(nodeAddress);
    const stakedAddresses = stakeData.body.holderRecords.map(record => record.source);
    stakedAddresses.push('0x94538853Fd519B99964369fe84e6475d705A4454');
    stakedAddresses.push('0xA2D87d7E21F0f79222DB1b438e87220247A450f6');
    return stakedAddresses;
  }

  function createMerkleTree(addresses) {
    const leaves = addresses.map(address => keccak256(toBuffer(address)));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    return tree;
  }

  const nodeAddress = '0x104f8b65bf3fa313cc2998b2ab7319f9eca57089'; // guardian node address
  const addresses = await getStakedAddresses(nodeAddress);
  const merkleTree = createMerkleTree(addresses);
  const root = merkleTree.getHexRoot();

  let result = {
    success: '',
  };

  async function sendTransactionWithKeys(privateKey, contractAddress, contractAbi, merkleRoot) {
    try {
      // Initialize provider and signer
      const provider = new ethers.providers.JsonRpcProvider('https://eth-rpc-api-testnet.thetatoken.org/rpc')
      const wallet = new ethers.Wallet(privateKey, provider);
  
      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, contractAbi, wallet);
  
      // Prepare the transaction data
      const transaction = await contract.populateTransaction.updateMerkleRoot(merkleRoot);
  
      // Send the transaction
      const response = await wallet.sendTransaction(transaction);
  
      console.log('Transaction hash:', response.hash);
      
      return response.hash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }

  if(process.env.NEXT_PUBLIC_TEST) { 
      console.log('It is set!'); 
  }
  else { 
      console.log('No set!'); 
  }
  
  try {
    const transactionHash = await sendTransactionWithKeys(process.env.PRIVATE_KEY, GOTDistributorAddress, GOTDistributorAbi, root);
    console.log('Transaction sent:', transactionHash);
    result.success = `Transaction sent: ${transactionHash}`;
  } catch (error) {
    console.error('Failed to send transaction:', error);
    result.failure = `Failed to send transaction: ${error.message}`;
  }
    
  response.status(200).json({
    body: result,
  });
}