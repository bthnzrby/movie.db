import React from "react";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import { Route, Routes, useParams } from "react-router-dom";
import { link } from "fs";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import ProfilPage from "./pages/login/SignUp";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/login/SignUp";
import AllMovies from "./pages/AllMovies/AllMovies";
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={``} element={<MainPage/>}/>
        <Route path={`/detail/:id`}  element={<MovieDetailPage/>}/>
        <Route path={`/Profil`} element={<ProfilPage/>}/>
        <Route path={`/SignIn`} element= {<SignIn/>}/>
        <Route path={`/SignUp`} element= {<SignUp/>}/>
        <Route path={`/AllMovies`} element= {<AllMovies/>}/>
      </Routes>

    </div>
  );
}


export default App;
