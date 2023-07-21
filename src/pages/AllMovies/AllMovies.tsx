import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { API_KEY, DETAIL_URL, IMG_URL } from "../../config/Url";
import axios from "axios";
import { MoviesMainOutput } from "../../components/mainPageComponents/FilmCarousel";

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
      <div className="all-movies-section">
        <div className="all-movies-card">
          {moviesUpcoming.map((upComing: MoviesMainOutput) => (
            <div className="all-movies-card">
              {/* {upComing} */}
              {/* <img
                src={`${IMG_URL}${IMG_SIZE_500}${recom.poster_path}`}
                alt=""
              /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
