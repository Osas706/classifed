import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Categories from '../../components/categories/Categories';
import AppDownload from '../../components/appDownload/AppDownload';
import AdDisplay from '../../components/adsDisplay/AdDisplay';

const Home = () => {
  const [category, setCategory] = useState('All');

  return (
    <div>
      <Header />
      <Categories category={category} setCategory={setCategory} />
      <AdDisplay category={category} />
      <AppDownload />
    </div>
  )
}

export default Home
