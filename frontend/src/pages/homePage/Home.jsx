import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Categories from '../../components/categories/Categories';
import AppDownload from '../../components/appDownload/AppDownload';
import AdDisplay from '../../components/adsDisplay/AdDisplay';

const Home = () => {
  
  return (
    <div>
      <Header />
      <Categories />
      <AdDisplay />
      <AppDownload />
    </div>
  )
}

export default Home
