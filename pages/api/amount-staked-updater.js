import axios from 'axios';
import { ethers } from 'ethers';
import { GOTDistributorAddress } from '../../web3/addressConstants';
import { GOTDistributorAbi } from '../../web3/GOTDistributorAbi';

async function getStakeByAddress(address) {
    const response = await axios.get(`https://explorer.thetatoken.org:8443/api/stake/${address}`);
    return response.data; // Replace with the actual format of the staked data returned by the API
}

async function sendTransactionWithKeys(privateKey, contractAddress, contractAbi, sources, amounts) {
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://eth-rpc-api-testnet.thetatoken.org/rpc');
        const wallet = new ethers.Wallet(privateKey, provider);

        const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

        const transaction = await contract.populateTransaction.updateAmountStaked(sources, amounts);

        // transaction.gasLimit = 20000000;

        const response = await wallet.sendTransaction(transaction);

        console.log('Transaction hash:', response.hash);

        return response.hash;
    } catch (error) {
        console.error('Error sending transaction:', error);
        throw error;
    }
}

export default async function handler(request, response) {
    let result = {
        success: '',
    };

    try {
        // Get address from path parameter
        const nodeAddress = request.query.address; // Extract address from path parameter

        // Fetch staked data from the API
        const stakedDataFromAPI = await getStakeByAddress(nodeAddress);

        // Filter holderRecords based on the address
        const holderRecords = stakedDataFromAPI.body.holderRecords.filter(record => record.source === nodeAddress);

        // push in testing addresses and amounts
        holderRecords.push({
            source: '0xd14d71E155f24C00AaAAD9E9e9955B4637E4b324', // theta vibes tester address, testnet
            amount: '10000000000000000000000'
        })
        holderRecords.push({
            source: '0x47f9899Dc03E35b5802f50D6C675846752DF97B0', // theta vibes tester address, testnet
            amount: '10000000000000000000000'
        })

        // Initialize param arrays
        let sources = [];
        let amounts = [];

        // Transform staked data into the required format
        holderRecords.forEach(item => {
            sources.push(item.source),
            amounts.push(ethers.BigNumber.from(item.amount.substring(0, item.amount.length - 18)));
        });

        // Call the transaction function with the staked data
        const transactionHash = await sendTransactionWithKeys(
            process.env.PRIVATE_KEY,
            GOTDistributorAddress,
            GOTDistributorAbi,
            sources,
            amounts
        );

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
