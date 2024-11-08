import React from 'react';
import './AppDownload.css';
import PlayStore from '/play_store.png';
import AppStore from '/app_store.png';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
       <p>For Better Experience Download <br /> 247Market App</p> 

       <div className="app-download-platforms">
        <img src={PlayStore} alt="" />
        <img src={AppStore} alt="" />
       </div>
    </div>
  )
}

export default AppDownload
