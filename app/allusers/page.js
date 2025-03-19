'use client'
import React,{useEffect,useState,useContext} from 'react';
import { UserCard } from '../../Component/ComponentIndex';
import Style from '../../Styles/allUsers.module.css';
import { ChatAppContext } from '../../Context/ChatAppContext';
const  AllUsers =()=> {
    const {userLists,addfreinds}=useContext(ChatAppContext);
 
    return (
        <div>
          <div className={Style.alluser_info}>
          <h1>
            FindYour freinds
            </h1>  
            </div>  
            <div className={Style.alluser}>  
            {userLists && userLists.length>0?
            (userLists.map((el,i)=>(
            <UserCard key={i+1} el={el} i={i} addfreinds={addfreinds}/>   
            ))):( <p> userLists not  found </p> )
            }
            </div>  
        </div>
    );
}

export default AllUsers;