import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { API_KEY, DETAIL_URL, DISCOVER_URL } from "../../config/Url";
import axios from "axios";
import { MoviesMainOutput } from "../../components/mainPageComponents/FilmCarousel";

import "./AllMovies.css";
import Movies from "./Movies/Movies";
import FilterSection from "../../components/FilterSection/FilterSection";
import { Button } from "antd";

const AllMovies = () => {
  // const [moviesPopuler, setMoviesPopuler] = useState<Array<MoviesMainOutput>>(
  //   []
  // );
  // const [moviesTopRated, setMoviesTopRated] = useState<Array<MoviesMainOutput>>(
  //   []
  // );
  // const [moviesUpcoming, setMoviesUpcoming] = useState<Array<MoviesMainOutput>>(
  //   []
  // );

  // useEffect(() => {
  //     axios.get(DETAIL_URL + "upcoming?" + API_KEY).then((res) => {
  //       setAllMovies( (
  //         prevState
  //       ) => [
  // ...prevState, ...res.data.results
  //       ]);

  //     });
  //   }, [setAllMovies]);
  //   useEffect(() => {
  //     axios.get(DETAIL_URL + "top_rated?" + API_KEY).then((res) => {
  //       setAllMovies( (
  //         prevState
  //       ) => [
  // ...prevState, ...res.data.results
  //       ]);
  //     });
  //   }, [setAllMovies]);
  const [allMovies, setAllMovies] = useState<Array<MoviesMainOutput>>([]);
  const [pageCount, setPageCount] = useState<number>(1);

  useEffect(() => {
    axios.get(DISCOVER_URL + "&page=" + pageCount).then((res) => {
      setAllMovies((prevAllMovies) => [...prevAllMovies, ...res.data.results]);

      // console.log(res.data.results);
    });
  }, [pageCount]);

  return (
    <div className="all-movies">
      <Navbar />
      <div className="all-movies-section-title">
        <div className="all-movies-section-content">
          <div className="filter-section">
            <FilterSection />
          </div>
          <div className="all-movies-section">
            <h1>All Movies</h1>
            {/* <Movies movies={moviesUpcoming}/> */}
            {/* <Movies movies={moviesPopuler}/> */}
            {/* <Movies movies={moviesTopRated}/> */}
            <Movies movies={allMovies} />
            <Button onClick={() => setPageCount(pageCount + 1)}> tıkla</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
