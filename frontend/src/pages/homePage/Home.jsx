import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Categories from '../../components/categories/Categories';
import FoodDisplay from '../../components/foodDisplay/FoodDisplay';
import AppDownload from '../../components/appDownload/AppDownload';

const Home = () => {
  const [category, setCategory] = useState('All');

  return (
    <div>
      <Header />
      <Categories category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  )
}

export default Home
