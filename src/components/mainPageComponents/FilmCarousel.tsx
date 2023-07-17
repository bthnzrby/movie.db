import React, { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Carousel, Radio, Tooltip } from "antd";
import type { DotPosition } from "antd/es/carousel";
import axios from "axios";
import "./FilmCarousel.css";
import { API_KEY, DETAIL_URL, IMG_SIZE_500, IMG_URL } from "../../config/Url";
import { Link } from "react-router-dom";

export interface MoviesMainOutput {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  background: "#364d79",
};

const FilmCarousel = () => {
  const [dotPosition, setDotPosition] = useState<DotPosition>("bottom");

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
    axios.get(DETAIL_URL + "popular?" + API_KEY).then((res) => {
      setMoviesPopuler(res.data.results);
      // console.log(res.data.results);
    });
  }, [setMoviesPopuler]);

  useEffect(() => {
    axios.get(DETAIL_URL + "top_rated?" + API_KEY).then((res) => {
      setMoviesTopRated(res.data.results);
      console.log(res.data);
    });
  }, [setMoviesTopRated]);

  useEffect(() => {
    axios.get(DETAIL_URL + "upcoming?" + API_KEY).then((res) => {
      setMoviesUpcoming(res.data.results);
      // console.log(res.data);
    });
  }, [setMoviesUpcoming]);

  // const handlePositionChange = ({ target: { value } }: RadioChangeEvent) => {
  //   setDotPosition(value);
  // };

  // moviesPopuler && console.log(moviesPopuler);
  // moviesTopRated && console.log(moviesTopRated);
  // moviesUpcoming && console.log(moviesUpcoming);

  const slidesPopular = [];
  const slidesTopRated = [];
  const slidesUpcoming = [];
  for (let k = 0; k < 3; k++) {
    let moviesType = [];
    if (k === 0) moviesType = moviesPopuler;
    else if (k === 1) moviesType = moviesTopRated;
    else moviesType = moviesUpcoming;
    for (let i = 0; i < moviesType.length; i += 5) {
      const moviesInSlide = moviesType.slice(i, i + 5).map((movieP, index) => (
        <div className="movie-field" key={movieP.id}>
          <li>
            <Link to={`/detail/${movieP.id}`}>
              <img
                className="click-movie"
                src={`${IMG_URL}${IMG_SIZE_500}${movieP.poster_path}`}
                alt=""
              />
              <div className="movie-info">
                {movieP.title.length > 28 ? (
                  <Tooltip placement="bottom" title={movieP.title}>
                    <p className="movie-title">{movieP.title}</p>
                  </Tooltip>
                ) : (
                  <p className="movie-title">{movieP.title}</p>
                )}
                <h4
                  className="movie-imdb"
                  style={{
                    color:
                      movieP.vote_average > 7
                        ? "green"
                        : movieP.vote_average > 4
                        ? "yellow"
                        : "red",
                  }}
                >
                  {movieP.vote_average}
                </h4>
              </div>
            </Link>
          </li>
        </div>
      ));
      k === 0
        ? slidesPopular.push(
            <div key={i}>
              <ul className="slide-movies">{moviesInSlide}</ul>
            </div>
          )
        : k === 1
        ? slidesTopRated.push(
            <div key={i}>
              <ul className="slide-movies">{moviesInSlide}</ul>
            </div>
          )
        : slidesUpcoming.push(
            <div key={i}>
              <ul className="slide-movies">{moviesInSlide}</ul>
            </div>
          );
    }
  }
  return (
    <div className="film-carousel">
      <div className="populer-movies">
        <h2>Populer Movies</h2>
        <Carousel dotPosition={dotPosition}>{slidesPopular}</Carousel>
      </div>
      <div className="top-rated-movies">
        <h2>Top Rated Movies</h2>
        <Carousel dotPosition={dotPosition}>{slidesTopRated}</Carousel>
      </div>
      <div className="upcoming-movies">
        <h2>Upcoming Movies</h2>
        <Carousel dotPosition={dotPosition}>{slidesUpcoming}</Carousel>
      </div>
    </div>
  );
};

export default FilmCarousel;
