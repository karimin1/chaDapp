'use react'
import React,{useState,useEffect,useContext} from 'react';
import Style from './NavBar.module.css'
import Image from 'next/image';
import Link from 'next/link';
import {Error} from "../ComponentIndex"
import images from '../../assets'
import { ChatAppContext } from '../../Context/ChatAppContext';
import { Model } from '../ComponentIndex';
import { LocaleRouteNormalizer } from 'next/dist/server/normalizers/locale-route-normalizer';
//IMPORT INTERN
const NavBar=()=> {
    const {CheckIfWalletConnect,creatAccount,connectingWithContract,account,userName,connectWallet,error}=useContext(ChatAppContext);
    const menuTems=[
        {menu:'All Users',link:'/allusers'},
        {menu:'CHAT',link:'/'},
        {menu:'CONTACT',link:'/'},
        {menu:'SETTING',link:'/'},
        {menu:'TERMS OF',link:'/'},
    ]
    //  USE STATE
    const [active,setActive]=useState(2);
    const [open,setOpen]=useState(false);
    const [openModel,setOpenModel]=useState(false);
    const [error1,setError]=useState(error);
    console.log('heeey navbar error',error);
    return (
        <div className={Style.NavBar}>
            <div className={Style.NavBar_box}>
            <div className={Style.NavBar_box_left}>
            
            <Image src={images.logo} alt='logo' width={50} height={50}/>
            </div>
            <div className={Style.NavBar_box_right}>
            {/* DESKTOP */}
            <div className={Style.NavBar_box_right_menu}>
            {menuTems.map((el,i)=>(
                <div key={i+1} onClick={()=>setActive(i+1)} 
                className={`${Style.NavBar_box_right_menu_items}
                 ${active==i+1?Style.active_btn:""}`}>
                <Link className={Style.NavBar_box_right_menu_items_link}
                 href={el.link}> {el.menu} </Link>  
                </div>  
            ))}
            </div>

            {/* MOBILE */}
           {open &&(
                <div className={Style.Mobile_menu}>
            {menuTems.map((el,i)=>(
                <div key={i+1} onClick={()=>setActive(i+1)} 
                className={`${Style.Mobile_menu_items} ${active==i+1?Style.active_btn:""}`}>
                <Link className={Style.Mobile_menu_items_link} href={el.link}> {el.menu} </Link>  
                </div>  
            ))}
           
          <p className={Style.Mobile_menu_btn}>
            <Image src={images.close} width={50} height={50} alt='close_icon'
                onClick={()=>setOpen(false)}
            />
            </p> 
             </div>
            )} 
            {/* CONNECT  WALLET*/}
            <div className={Style.NavBar_box_right_connect}>
            {console.log('account',account)}
                {account==""?(
                    <button onClick={()=>connectWallet()}>
                        {""}
                        <span>Connect Wallet</span>
                    </button>
                ):(
                    <button onClick={()=>setOpenModel(true)}>
                    {""}
                    <Image src={userName?images.accountName:images.create2} alt='Account image'
                    width={20}  height={20} /> {""}
                    <span> {userName|| "create Account"}  </span>  
                    </button>  
                )}
            </div>
            <div className={Style.NavBar_box_right_open} 
            onClick={()=>setOpen(true)}>
            <Image src={images.open} alt='open'
            width={30} height={30} />
            </div> 
            </div>
            </div>
            {/* MODEL COMPONENT */}
             {openModel && (
                <div className={Style.ModelBox}>
                <Model 
                openBox={setOpenModel}
                    title='WELCOME TO'
                    head="CHAT BUDDY"
                    info="lorem ofsdjilorem ofsdjilorem ofsdji
               lorem ofsdjilorem ofsdjilorem ofsdji
               lorem ofsdjilorem ofsdji"
               smaLLInfo="Kindley seclet your name..."
               addreess={account}
               image={images.hero}
               functionName={creatAccount}
                />
           

                </div> 
            )}  
            {console.log('heeey sending navbar ',error1)}
           {error1 &&
         
           <Error error2={error1}/> 
           } 
            
        </div>
    );
}

export default NavBar;