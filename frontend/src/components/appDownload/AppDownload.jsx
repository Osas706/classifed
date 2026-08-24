import React from 'react';
import PlayStore from '/play_store.png';
import AppStore from '/app_store.png';

const AppDownload = () => {
  return (
    <div className='mx-auto mt-[50px] text-center font-medium text-[max(3vw,20px)]' id='app-download'>
       <p>For Better Experience Download <br /> 247Market App</p>

       <div className="mt-10 flex justify-center gap-[max(2vw,10px)]">
        <img className="w-[max(30vw,120px)] max-w-[180px] cursor-pointer transition-transform duration-500 hover:scale-105" src={PlayStore} alt="" />
        <img className="w-[max(30vw,120px)] max-w-[180px] cursor-pointer transition-transform duration-500 hover:scale-105" src={AppStore} alt="" />
       </div>
    </div>
  )
}

export default AppDownload
