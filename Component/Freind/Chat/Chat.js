'use client'
import React,{useEffect,useState} from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import images from '../../../assets'
import {converTime} from '../../../Utils/apiFeatures'
import {Loader} from '../../ComponentIndex'
//INTERNAL IMPORT
import Style from './Chat.module.css'
const Chat=({
    functionName,
    readMessage,
    freindMsg,
    account,
    userName,
    loading,
    currentUserName,
    currentUserAddress,
    readUser
})=> {
    //USE STATE
    const [message,setMessage]=useState('');
    const [chatData,setChatData]=useState({
        name:'',
        address:'',
    })
   const searchparams=useSearchParams();
   useEffect(()=>{
    if(!searchparams)return
    const name=searchparams.get('name');
    const address=searchparams.get('address');
    setChatData({name,address});
    readMessage(address);
    readUser(address)

   },[searchparams.toString()])
   console.log('searchparamsReadyquery',searchparams.toString());
   {console.log('heeeeeeeeeeeeeeeeeey 1 freindMsg',freindMsg)}

   console.log(chatData.address,chatData.name);
   console.log("")
    return (
        <div className={Style.Chat}>
        {currentUserAddress && currentUserName ?
        (
            <div className={Style.Chat_user_info}>
            <Image src={images.accountName}
            alt='image'
            width={70}
            height={70}/>
              <div className={Style.Chat_user_info_box}>  
              <h4>{currentUserName}</h4>
              <p className={Style.show}>
              {currentUserAddress}</p>
              </div>
              </div>
            
        ):(
        ""
        )}
        
        <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
        <div className={Style.Chat_box_left}>
        {console.log('heeeeeeeeeeeeeeeeeey 2  freindMsg',freindMsg)}
            {Array.isArray(freindMsg) && freindMsg.length>0 ? (freindMsg.map((el,i)=>(
                
                <div key={i+1}>
                {el.sender==chatData.address?
                (<div className={Style.Chat_box_left_title}>
                    <Image src={images.accountName}
                    alt='image' 
                    width={50}
                    height={50}
                    />
                     <span>
                        {chatData.name}{""}
                        <small>Time:{converTime(el.time)}</small>
                     </span>
                </div>):(
                    <div className={Style.Chat_box_left_title}>
                    <Image src={images.accountName}
                    alt='image' 
                    width={50}
                    height={50}
                    />
                     <span>
                        {userName}{""}
                        <small>Time:{el.time?converTime(el.time):'invalide timestampe'}</small>
                     </span>
                </div>
                )}
                <p key={i+1}>kkkkk {el.msg}{""}{""}    </p> 
                </div> ))
            ):( <p>No messages</p>)
            }
            </div>
             
        </div> 
        </div>   
            {currentUserAddress && currentUserName ?(
                <div className={Style.Chat_box_send}> 
                <div className={Style.Chat_box_send_img}> 
                <Image src={images.smile} alt='smile'
                width={50} height={50}/> 
                <input type='text' placeholder='' value={message}
                  onChange={(e) => {
        setMessage(e.target.value);
        console.log("Updated message:", e.target.value);
    
       

    }}/>  
                <Image src={images.file} alt='file'
                 width={50} height={50}/> 
                { loading?(
                        <Loader/>   
                    ):(
                 <Image src={images.send} alt='file'
                 width={50}
                  height={50} 
                 onClick={async()=>{ 
                    console.log('xxxxxxxxxxxxxxxxxxxxxxxx')
                    console.log('heeey   this is chatData.address,message',chatData.address,message);
                    functionName({address_freind:chatData.address,msg:message})
                    }
                   
                    }
                    
                    /> 
                    )
                 }
                  </div>  
                  </div>   
            ):("")}
        
        </div>
    );
}

export default Chat;