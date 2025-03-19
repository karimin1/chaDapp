import React,{useEffect,useState,useContext} from 'react';
import Image from 'next/image';
import Style from './Model.module.css'
import images from '../../assets'
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Loader } from '../ComponentIndex';
const  Model=({
    openBox,
    address,
    title,
    head,
    info,
    smallInfo,
    image,
    functionName})=> {

    const [name,setName]=useState('');
    const [accountAddress,setAccountAddress]=useState('');
    const {loading}=useContext(ChatAppContext);

    return (
        <div className={Style.Model}>
        <div className={Style.Model_box}>
        
        <div className={Style.Model_box_left}>
        <Image src={image} alt='buddy'  />
        </div>
        <div className={Style.Model_box_right}>
        
        
        <h1>{title}<span>{head}</span>
        </h1>
        <p>{info}</p>
        <small>{smallInfo}</small>
        {
            loading==true?(<Loader/>):(
                <div className={Style.Model_box_right_name}>
        <div className={Style.Model_box_right_name_info}>
        <Image src={images.username} alt='user' width={30}
            height={30}
        />
        <input type='text' placeholder='your name'
         onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className={Style.Model_box_right_name_info}>
        <Image src={images.account} alt='user' width={30}
            height={30}
        />
        <input 
        type='text'
         placeholder={address||"Enter address.."}
         onChange={(e)=>setAccountAddress(e.target.value)}/>
        </div>

        <div className={Style.Model_box_right_name_btn}>
         <button onClick={async()=>{
            console.log('name and accountAddress',name,accountAddress);
            try{
                const tx= await functionName({name,accountAddress});
                if(!tx){
                    console.error('something s wrong');
                    return;
                }
                const recipient=await tx.wait();
                console.log('recipient',recipient);
            }catch(error){
                console.log("error",error)}
            
            }
            
            }>
            {""}
            <Image src={images.send} alt='send'
             width={30} 
                height={30}
             />
             {""}
             Submit
        </button> 
        <button onClick={()=>openBox(false)}>
            {""}
            <Image src={images.close} alt='send'
             width={30} 
                height={30}
             />
             {""}
             Cancel
        </button>
        </div>
        </div>
            )
        }
        
        </div>
        
        </div>
        </div>
    );
}

export default Model;