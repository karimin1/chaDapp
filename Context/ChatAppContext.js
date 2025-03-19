'use client';
import React,{useEffect,useContext,useState} from 'react'
import { useRouter } from 'next/navigation';
//INTERNAL IMPORT
import { CheckIfWalletConnect,connectWallet,connectingWithContract } from '../Utils/apiFeatures'
export const ChatAppContext=React.createContext();
export const ChatAppProvider=({children})=>{
const [account,setAccount]=useState('');
const [userName,setUserName]=useState('');
const [freindList,setFreindList]=useState([]);
const [freindMsg,setfreindMsg]=useState([]);
const [loading,setLoading]=useState(false);
const [userLists,setUserLists]=useState([]);
const [error,setError]=useState("");
//CHAT USER DATA
const [currentUserName,setCurrentUserName]=useState('');
const [currentUserAddress,setCurrentUserAddress]=useState('');
const router =useRouter();
const fetchData = async () => {
    try {
       console.log("Fetching contract...");
       const contract = await connectingWithContract();
       console.log("Contract fetched:", contract);
 
       console.log("Fetching account...");
       const connectAccount = await connectWallet();
       setAccount(connectAccount);
       console.log("Account fetched:", connectAccount);

        console.log("Fetching username...");
  const userName = await contract.getUserName(connectAccount);
 setUserName(userName); // Ensure you store the username correctly
      console.log("Username fetched:", userName);
 
       console.log("Fetching friend list...");
       const freindList = await contract.getMyFreindList();
       setFreindList(freindList);
       console.log("Friend list fetched:", freindList);
 
       console.log("Fetching all users...");
       const allAppUser = await contract.getAllUserApp();
       setUserLists(allAppUser);
       console.log("All users fetched:", allAppUser);
 
    } catch (error) {
       //console.error("Error in fetchData:", error);
       setError("Please install and connect your wallet");
    }
 };
 
useEffect(()=>{
    console.log('fetchins data processing');
    fetchData();
},[]);
//READ MESSAGE
const readMessage=async(freindAddress)=>{
    try{
        const contract =await connectingWithContract();
        const freindMsg=await  contract.readMessage(freindAddress);
        setfreindMsg(freindMsg);
        // router.push('/');
        // window.location.reload();
    }catch(error){
        setError('currently you have no message');
    }

}
//CREATE ACCOUNT
const creatAccount=async({name,address_user})=>{
    try{
         //if(!name||!address_user)return setError('name and account can"t be emty')
    const contract=await connectingWithContract();
         console.log('this is the contract instance for signer',contract);
    const getCreatedUSer =await contract.createAccount(name);
    setLoading(true);
    await  getCreatedUSer.wait();
    setLoading(false);
    }catch(error){
        setError('error while creating  account');
    }
}
//ADD YOUR FREINDS
const addfreinds = async (address_freind, name) => {
    try {
     // if (!name || !address_freind) return setError("Please provide data");
  
      const contract = await connectingWithContract();
      
      console.log("Calling contract function with:", address_freind, name);
      
      const tx = await contract.addfreinds(address_freind, name);
      setLoading(true);
      
      await tx.wait(); // Wait for transaction to complete
      setLoading(false);
      
      router.push("/");
      window.location.reload();
      
      console.log("Friend added successfully!");
    } catch (error) {
      console.error("Error adding friend:", error); // Log full error
      setError(`Something went wrong: ${error.message}`); // Show error message
    }
  };
  
//SEND MESSAGE TO YOUT FREIND
const sendMessage=async({address_freind,msg})=>{
    console.log('ggggggggggggaddress_freind,msg',address_freind,msg) 
try{
   if(!address_freind||!msg){
          console.log('address_freind,msg',address_freind,msg) 
          return  setError('miss information');
        }
 const contract=await connectingWithContract();
 const Msg_sent=await contract.sendMessage(address_freind,msg);
   const Msg_readMsg=await contract.readMessage(address_freind);
setLoading(true);
 await Msg_sent.wait();
//setfreindMsg(Msg_readMsg);
setLoading(false);

}catch(error){
    setError('something wrong happened');
}
}
//READ USER INFO
const readUser=async(address_user)=>{
try{
    const contract=await connectingWithContract();
    const userinfo=contract.getUserName(address_user);
    setCurrentUserName(userinfo);
    setCurrentUserAddress(address_user);
    console.log('setCurrentUserName && setCurrentUserAddress',currentUserName,currentUserAddress)
}catch(error){
    setError('something going  wrong with the user Info');
}
}
console.log('error is',error);
return(
    <ChatAppContext.Provider value={{
        readMessage,
        addfreinds,
        creatAccount,
        sendMessage,
        readUser,
        account,
        userName,
        freindList,
        freindMsg,
        loading,
        userLists,
        error,
        currentUserName,
        currentUserAddress}}>
    {children}
    </ChatAppContext.Provider>
)
}