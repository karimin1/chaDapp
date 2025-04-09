import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { ChatAppAbi, ChatDappAddress } from '../Context/constant';

export const CheckIfWalletConnect = async () => {
    try {
        if (!window.ethereum) return console.log('Install MetaMask');
        const accounts = await window.ethereum.request({
            method: 'eth_accounts',
        });
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log('Error while checking wallet connection:', error);
    }
};

export const connectWallet = async () => {
    try {
        if (!window.ethereum) return console.log('Install MetaMask');
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });

        if (!accounts || accounts.length === 0) {
            throw new Error('No account connected');
        }
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log('Error while connecting wallet:', error);
    }
};


export const fetchContract=(signerOrProvider)=>{
     const contract=new ethers.Contract(ChatDappAddress,ChatAppAbi,signerOrProvider);
    console.log('fetchong cntract',contract);
     return contract;
        }
        export const connectingWithContract = async () => {
            try {
                const web3modal = new Web3Modal();
                console.log('web3modal is:', web3modal);
        
                const connection = await web3modal.connect();
                console.log('Connection is:', connection);
        
                const provider = new ethers.providers.Web3Provider(connection);
                console.log('Provider is:', provider);
        
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                if (!address) {
                    console.log('No address found');
                } else {
                    console.log('Address:', address);
                }
        
                const network = await provider.getNetwork();
                console.log('Connected to network:', network);
        
                if (!signer) {
                    throw new Error('No signer found');
                }
        
                const contract = fetchContract(signer);
                console.log('Contract is:', contract);
        
                if (!contract) {
                    throw new Error('Contract not properly initialized');
                }
        
                return contract;
            } catch (error) {
                console.error('Error in connectingWithContract:', error);
            }
        };
        

         
        export const converTime = (time) => {
            const newTime = new Date(time.toNumber());
            const realTime =
                newTime.getSeconds() + '/' +
                newTime.getMinutes() + '/' +
                newTime.getHours() + '/Date:' +
                newTime.getDate() + '/' +
                (newTime.getMonth() + 1) + '/' +
                newTime.getFullYear();
            return realTime;
        };