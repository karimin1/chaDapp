import React,{useEffect,useContext,useState} from 'react';
import Image from 'next/image';
import { ChatAppContext } from '../../Context/ChatAppContext';
import images from '../../assets'
import { Model } from '../ComponentIndex';
import Style from './Filter.module.css'
const Filter=() =>{
    const {account,addfreinds}=useContext(ChatAppContext);
   //USESTATE
   const [addfreind,setAddFreind]=useState(false);
    return (
        <div className={Style.Filter}> 
        <div className={Style.Filter_box}>
         <div className={Style.Filter_box_left}>
            <div className={Style.Filter_box_left_search}>
                <Image src={images.search} alt='image'
                width={20} height={20}
                /> 
          <input type='text'  placeholder='search...'/>
            </div> 
         </div> 
         <div className={Style.Filter_box_right}>
          <button> 
          <Image src={images.clear}
            alt='clear'
            width={20} height={50}
          />
          CLEAR CHAT
           </button> 
           
      
           <button onClick={()=>setAddFreind(true)}> 
          <Image src={images.clear}
            alt='clear'
            width={20} height={50}
          />
          ADD FREINDS
           </button> 
             
        </div>  
        </div>
     {/* MODEL COMPONENT */}
     {addfreind &&(
        <div className={Style.Filter_model}>
        <Model openBox={setAddFreind}
            title='WELCOME TO'
            head='CHAT BUDDY'
            info='
     
         <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
         xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
         xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
         xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx </p>'
         smallInfo='kindly select your freind name
         && address...'
         image={images.hero}
         functionName={addfreinds()}   />
         </div>
     )}
        </div>
    );
}

export default Filter;  