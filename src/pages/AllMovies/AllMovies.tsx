import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { API_KEY, DETAIL_URL} from "../../config/Url";
import axios from "axios";
import { MoviesMainOutput } from "../../components/mainPageComponents/FilmCarousel";

import "./AllMovies.css";
import Movies from "./Movies/Movies";
import FilterSection from "../../components/FilterSection/FilterSection";

const AllMovies = () => {
  const [moviesPopuler, setMoviesPopuler] = useState<Array<MoviesMainOutput>>(
    []
  );
  const [moviesTopRated, setMoviesTopRated] = useState<Array<MoviesMainOutput>>(
    []
  );
  const [moviesUpcoming, setMoviesUpcoming] = useState<Array<MoviesMainOutput>>(
    []
  );

  useEffect(() => {
    axios.get(DETAIL_URL + "upcoming?" + API_KEY).then((res) => {
      setMoviesUpcoming(res.data.results);
      console.log(res.data.results);
    });
  }, [setMoviesUpcoming]);
  useEffect(() => {
    axios.get(DETAIL_URL + "top_rated?" + API_KEY).then((res) => {
      setMoviesTopRated(res.data.results);
    });
  }, [setMoviesTopRated]);

  useEffect(() => {
    axios.get(DETAIL_URL + "popular?" + API_KEY).then((res) => {
      setMoviesPopuler(res.data.results);
      // console.log(res.data.results);
    });
  }, [setMoviesPopuler]);

 
  return (
    <div className="all-movies">
      <Navbar />
      <div className="all-movies-section-title">
        <div className="all-movies-section-content">
          <div className="filter-section">
            <FilterSection/>
          </div>
          <div className="all-movies-section">
        <h1>All Movies</h1>
            <Movies movies={moviesUpcoming}/>
            <Movies movies={moviesPopuler}/>
            <Movies movies={moviesTopRated}/>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
