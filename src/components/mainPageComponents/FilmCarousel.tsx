import React, { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Carousel, Radio } from "antd";
import type { DotPosition } from "antd/es/carousel";
import axios from "axios";
import "./FilmCarousel.css";
import { API_KEY, DETAIL_URL, IMG_SIZE_500, IMG_URL } from "../../config/Url";

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
  height: "460px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const FilmCarousel = () => {
  const [dotPosition, setDotPosition] = useState<DotPosition>("top");

  const [moviesPopuler, setMoviesPopuler] = useState<Array<MoviesMainOutput>>(
    []
  );
  const [moviesTopRated, setMoviesTopRated] = useState<MoviesMainOutput>();
  const [moviesUpcoming, setMoviesUpcoming] = useState<MoviesMainOutput>();

  useEffect(() => {
    axios.get(DETAIL_URL + "popular?" + API_KEY).then((res) => {
      setMoviesPopuler(res.data.results);
      console.log(res.data.results);
    });
  }, [setMoviesPopuler]);

  useEffect(() => {
    axios.get(DETAIL_URL + "top_rated?" + API_KEY).then((res) => {
      setMoviesTopRated(res.data);
      console.log(res.data);
    });
  }, [setMoviesTopRated]);

  useEffect(() => {
    axios.get(DETAIL_URL + "upcoming?" + API_KEY).then((res) => {
      setMoviesUpcoming(res.data);
      console.log(res.data);
    });
  }, [setMoviesUpcoming]);

  // const handlePositionChange = ({ target: { value } }: RadioChangeEvent) => {
  //   setDotPosition(value);
  // };

  moviesPopuler && console.log(moviesPopuler);

  return (
    <div className="film-carousel">
      <div>
        {/* <Radio.Group onChange={handlePositionChange} value={dotPosition} style={{ marginBottom: 8 }}>
          <Radio.Button value="top">Top</Radio.Button>
          <Radio.Button value="bottom">Bottom</Radio.Button>
          <Radio.Button value="left">Left</Radio.Button>
          <Radio.Button value="right">Right</Radio.Button>
        </Radio.Group> */}
        <Carousel dotPosition={dotPosition}>
          <div style={contentStyle}>
            <ul className="deneme">
              {moviesPopuler.map((movie: any, i: number) => {
                if (i <= 4) {
                  return (
                    <div>
                      <li key={movie.id}>
                        <img
                          className="img"
                          src={IMG_URL + IMG_SIZE_500 + movie.poster_path}
                          alt=""
                        />
                      </li>
                      <p>{i}</p>
                    </div>
                  );
                }
              })}
            </ul>
          </div>
          <div style={contentStyle}>
            <ul className="deneme">
              {moviesPopuler.map((movie: any, i: number) => {
                if (4 < i && i <= 9) {
                  return (
                    <div>
                      <li key={movie.id}>
                        <img
                          className="img"
                          src={IMG_URL + IMG_SIZE_500 + movie.poster_path}
                          alt=""
                        />
                      </li>
                      <p>{i}</p>
                    </div>
                  );
                }
              })}
            </ul>
          </div>
          <div style={contentStyle}>
            <ul className="deneme">
              {moviesPopuler.map((movie: any, i: number) => {
                if (9 < i && i <= 14) {
                  return (
                    <div>
                      <li key={movie.id}>
                        <img
                          className="img"
                          src={IMG_URL + IMG_SIZE_500 + movie.poster_path}
                          alt=""
                        />
                      </li>
                      <p>{i}</p>
                    </div>
                  );
                }
              })}
            </ul>
          </div>
          <div style={contentStyle}>
            <ul className="deneme">
              {moviesPopuler.map((movie: any, i: number) => {
                if (14 < i && i <= 19) {
                  return (
                    <div>
                      <li key={movie.id}>
                        <img
                          className="img"
                          src={IMG_URL + IMG_SIZE_500 + movie.poster_path}
                          alt=""
                        />
                      </li>
                      <p>{i}</p>
                    </div>
                  );
                }
              })}
            </ul>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default FilmCarousel;
