import React,{useEffect,useState} from 'react';
import Image from 'next/image';
import images from '../../../assets'
import Link from 'next/link';
//INTERNAL IMPORT
import Style from './Card.module.css'
 
import { usePathname } from 'next/navigation';
const Card=({el,i,readMessage,readUser})=> {
  console.log('readUSer',readUser);
    return (
         <Link href={{pathname:'/',query:{name:`${el.name}`,address:`${el.pubkey}`}}}>
         {console.log('elpubkey',el.pubkey)}
            <div className={Style.Card} onClick={()=>(readUser(el.pubkey))}>
             <div className={Style.Card_box}>
             <div className={Style.Card_box_left}>
              <Image src={images.accountName}
             alt="username"
                width={50}
                height={50}
                className={Style.Card_box_left_img}
             />  
             
             </div> 
             <div className={Style.Card_box_right}>
             <div className={Style.Card_box_right_middle}>
             <h4 > {el.name}</h4> 
              <small > {el.pubkey.slice(21)}...</small>
             </div>
             <div className={Style.Card_box_right_end}>
           <small>{i+1}</small>   
             </div>    
            </div>
            </div>
             </div>
         </Link>
    );
}

export default Card;