import axios from 'axios';
import { ethers } from 'ethers';
import { GOTDistributorAddress } from '../../web3/addressConstants';
import { GOTDistributorAbi } from '../../web3/GOTDistributorAbi';

async function getStakeByAddress(address) {
    const response = await axios.get(`https://explorer-api.thetatoken.org/api/stake/${address}`);
    return response.data; 
}

async function sendTransactionWithKeys(privateKey, contractAddress, contractAbi, sources, amounts) {
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://eth-rpc-api.thetatoken.org/rpc');
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
        // // Set address for Guardian Node
        const nodeAddress = '0x104f8b65bf3fa313cc2998b2ab7319f9eca57089'; // guardian node address
        
        const userAddress = request.query.address.toLowerCase(); // Extract address from path parameter, needs to be lowercased to match what we get from the theta api

        // Fetch staked data from the API
        const stakedDataFromAPI = await getStakeByAddress(nodeAddress);

        console.log('stakedDateFromAPI', stakedDataFromAPI.body);
        
        // Filter holderRecords based on the address
        const holderRecords = await stakedDataFromAPI.body.holderRecords.filter(record => record.source === userAddress);

        // snippet to push in test address and amount if needed
        // holderRecords.push({
        //     source: '0x2e10e1eebf9796ca1f4fc09e084d78505f2d7380', // theta vibes tester address, testnet
        //     amount: '1000000000000000000'
        // })

        // Initialize param arrays
        let sources = [];
        let amounts = [];

        // Transform staked data into the required format
        await holderRecords.forEach(item => {
            sources.push(item.source),
            amounts.push(ethers.BigNumber.from(item.amount.substring(0, item.amount.length - 18)));
        });

        // if no stake record is found by this point then we push in 0 to overwrite any previously saved stake values
        if (holderRecords.length === 0) {
            sources.push(userAddress);
            amounts.push(ethers.BigNumber.from(0));
        }

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
