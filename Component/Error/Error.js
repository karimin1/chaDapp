import React from 'react';
import Style from './Error.module.css'
const Error=({error2})=>{
    return (
        <div className={Style.Error}>
          <div className={Style.Error_box}>
          <h1> Please Fix this error & Reload Browser</h1> 
          </div> 
          {error2}
         
        </div>
    );
}

export default Error;