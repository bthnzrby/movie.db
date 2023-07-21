import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { API_KEY, DETAIL_URL} from "../../config/Url";
import axios from "axios";
import { MoviesMainOutput } from "../../components/mainPageComponents/FilmCarousel";

import "./AllMovies.css";
import Movies from "./Movies/Movies";

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
        <h1>All Movies</h1>
      </div>
      <Movies movies={moviesUpcoming}/>
      <Movies movies={moviesPopuler}/>
      <Movies movies={moviesTopRated}/>
    </div>
  );
};

export default AllMovies;
