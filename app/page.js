'use client'
import React ,{useContext,useEffect,useState}from 'react';
import { ChatAppContext } from '../Context/ChatAppContext';
import {Filter,Freind} from '../Component/ComponentIndex';
function CHATApp() {
  const {freindList}=useContext(ChatAppContext);
  console.log('freindList',freindList);
  return (
    <div>
 
       
       <Filter/>  
       <Freind/>   
    </div>
  );
}

export default CHATApp;