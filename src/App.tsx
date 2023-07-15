import React from "react";
import "./App.css";
import MainPage from "./pages/MainPage";
import { Route, Routes, useParams } from "react-router-dom";
import { link } from "fs";
import MovieDetailPage from "./pages/MovieDetailPage";
import ProfilPage from "./pages/ProfilPage";
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={``} element={<MainPage/>}/>
        <Route path={`/detail/:id`}  element={<MovieDetailPage/>}/>
        <Route path={`/Profil`} element={<ProfilPage/>}/>
      </Routes>

    </div>
  );
}


export default App;
