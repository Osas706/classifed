import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Categories from '../../components/categories/Categories';
import AppDownload from '../../components/appDownload/AppDownload';
import AdDisplay from '../../components/adsDisplay/AdDisplay';

const Home = () => {
  const [adList, setAdList] = useState([]);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [])
  
  return (
    <div>
      <Header />
      <Categories adList={adList} />
      <AdDisplay adList={adList} setAdList={setAdList} />
      <AppDownload />
    </div>
  )
}

export default Home
