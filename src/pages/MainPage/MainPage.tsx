import React from "react";
import "./MainPage.css";
import Navbar from "../../components/navbar/Navbar";
import FilmCarousel from "../../components/mainPageComponents/FilmCarousel";

const MainPage = () => {

    return (
        <div className="main-page">
            <Navbar />
            <FilmCarousel />
        </div>
    );
};

export default MainPage;
