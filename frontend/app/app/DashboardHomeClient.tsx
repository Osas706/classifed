"use client";

import { useState } from "react";
import Header from "../../src/components/header/Header";
import Categories from "../../src/components/categories/Categories";
import AdDisplay from "../../src/components/adsDisplay/AdDisplay";

const DashboardHomeClient = () => {
  const [adList, setAdList] = useState<any[]>([]);

  return (
    <div>
      <Header />
      <Categories adList={adList} />
      <AdDisplay adList={adList} setAdList={setAdList} />
    </div>
  );
};

export default DashboardHomeClient;
