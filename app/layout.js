'use client'
import React,{useContext,useEffect,useState}from 'react'
import {ChatAppProvider} from '../Context/ChatAppContext';
import "../Styles/globals.css";
import { NavBar } from '../Component/ComponentIndex';

const RootLayout=({ children }) =>{
  return (
    <html> 
      <body>
    
      <ChatAppProvider>
      <NavBar/>
      {children}
      </ChatAppProvider>
        
      </body>
      </html>

  );
}
export default RootLayout;
