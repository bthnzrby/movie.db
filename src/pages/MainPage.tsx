import React, { useEffect, useState } from "react";

import Navbar from "../components/navbar/Navbar";
import { API_KEY, DETAIL_URL } from "../config/Url";
import axios from "axios";
import FilmCarousel from "../components/mainPageComponents/FilmCarousel";

const MainPage = () => {

  return (
    <div className="main-page">
      
      <Navbar/>
      <FilmCarousel/>
    </div>
  );
};

export default MainPage;
