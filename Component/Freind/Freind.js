'use client'
import React,{useState,useEffect,useContext} from 'react';
import Image from 'next/image';
//INTERNAL IMPORT
import Style from "./Freind.module.css" 
import images from '../../assets'
import Card from './Card/Card'
import Chat from './Chat/Chat'
import Link from 'next/link';
import { ChatAppContext } from '../../Context/ChatAppContext';
const Freind=()=> {
console.log('Card',Card);
    const {sendMessage,account,freindMsg,freindList,readUser,readMessage,userName,loading,currentUserName,currentUserAddress
    }=useContext(ChatAppContext);
    const array=[1,2,3,4,5,6];
 
        return (
        <div className={Style.Freind}>
      <div className={Style.Freind_box}>
      <div className={Style.Freind_box_left}>
      { freindList.map((el,i)=>(
    <Card key={i+1} 
        el={el}
        i={i}
        readMessage={readMessage}
        readUser={readUser}
        />  
      ))}
        </div>
        <div className={Style.Freind_box_right}>
      <Chat functionName={sendMessage}
        readMessage={readMessage}
            freindMsg={freindMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
        currentUserAddress={currentUserAddress}
        readUser={readUser} /> 
        </div>
      </div>
        </div>
    );
}

export default Freind;