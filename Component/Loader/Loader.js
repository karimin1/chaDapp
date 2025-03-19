import React from 'react';
import Image from 'next/image';
import images from '../../assets'
//INTERNAL IMPORT
import Style from './Loader.module.css'
const Loader=() =>{
    return (
        <div className={Style.Loader}>
           <div className={Style.Loader_box}>
           <Image src={images.loader}
            alt='loader'
            width={100}
            height={100} /> 
            </div> 
        </div>
    );
}

export default Loader;