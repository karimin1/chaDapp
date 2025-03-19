import React from 'react';
import Image from 'next/image';
import Style from './UserCard.module.css';
import images from '../../assets'
const UserCard=({el,i,addfreinds}) =>{
  console.log('el;i;addfreinds',el,i,addfreinds)

    return (
        <div className={Style.UserCard}>
        
          <Image src={ images[`image${i+1}`]}
          alt='user'
          width={100}
          height={100} 
/>   
          <div className={Style.UserCard_box_info}> 
          <h3>{el.name}</h3>
          <h3>{el.accountsAddress.slice(0,25)}..</h3>
          <button onClick={()=>addfreinds(el.accountsAddress,el.name)}>
            Add freinds
          </button>
          </div>
       
         <small className={Style.number}> </small>
</div>
    );
}

export default UserCard;