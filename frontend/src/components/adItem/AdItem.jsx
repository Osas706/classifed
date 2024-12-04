import React, { useContext } from 'react';
import './AdItem.css';
import {Link} from 'react-router-dom';
import { Watermark} from 'antd';
import { RiMapPinLine } from "react-icons/ri";

const AdItem = ({adImage, title, price, description, id, state}) => {

  return (
    <div className='ad-item'>
      <div className="ad-item-img-container">
        <Watermark
          image='/mark.png'
          offset={[150, 150]}
          rotate={-20}
          width={150}
        >
          <img className='ad-item-image' src={adImage} onContextMenu={(e) => e.preventDefault()} alt="" />
        </Watermark>  
      </div>

      <div className="ad-item-info">
        <div className="ad-item-title">
          <p>{title}</p>
        </div>

        <div className="desc">
         {description}
        </div>

        <p className='state'><RiMapPinLine />{state}</p>
    
        <div className="price">
          <p className="ad-item-price">₦{price?.toLocaleString()}</p>

          <Link className='view-btn' to={`/ad/${id}`}>view</Link>
        </div>
      
      </div>
    </div>
  )
}

export default AdItem;
