import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { API_KEY, DETAIL_URL, DISCOVER_URL } from "../../config/Url";
import axios from "axios";
import { MoviesMainOutput } from "../../components/mainPageComponents/FilmCarousel";

import "./AllMovies.css";
import Movies from "./Movies/Movies";
import FilterSection from "../../components/FilterSection/FilterSection";
import { Button, DatePickerProps } from "antd";

const AllMovies = () => {
  // const [genres, setGenres] = useState<Array<GenresOutput>>([]);
  // const [checkeds, setCheckeds] = useState<Array<string>>([])
  // const [denem, setdenem] = useState<any>([])

  // useEffect(() => {
  //   axios.get(DISCOVER_URL,{
  //     params: {with_genres: checkeds.join(",") }
  //   }).then((res) => {

  //     setdenem(res.data.results);

  //   });
  // }, [checkeds]);

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
  const [checkeds, setCheckeds] = useState<Array<string>>([]);
  const [filteredMovies, setFilteredMovies] = useState<Array<MoviesMainOutput>>(
    []
  );
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [startImdb, setStartImdb] = useState<1 | 10 | null>();
  const [endImdb, setEndImdb] = useState<1 | 10 | null>();

  // const [startImdb, setStartImdb] = useState<string>();

  useEffect(() => {
    axios.get(DISCOVER_URL + "&page=" + pageCount).then((res) => {
      setFilteredMovies((prevAllMovies) => [
        ...prevAllMovies,
        ...res.data.results,
      ]);

      // console.log(res.data.results);
    });
  }, [pageCount]);

  const filterHandler = (e: any) => {
    if (e.target.name === "show-more") setPageCount(pageCount + 1);

    // e.target.name === "show-more"
    axios
      .get(DISCOVER_URL, {
        params: {
          page: pageCount,
          with_genres: checkeds.join(","),
          "release_date.gte": startDate,
          "release_date.lte": endDate,
          "vote_average.gte": startImdb,
          "vote_average.lte": endImdb,
        },
      })
      .then((res) => {
        if (e.target.name !== "show-more") {
          setFilteredMovies(res.data.results);
        } else {
          setFilteredMovies((prevFilteredMovies) => [
            ...prevFilteredMovies,
            ...res.data.results,
          ]);
        }

        // console.log(res.data.genres);
      });
  };

  // useEffect(() => {
  //   filterHandler();
  // }, []);

  return (
    <div className="all-movies">
      <Navbar />
      <div className="all-movies-section-title">
        <div className="all-movies-section-content">
          <div className="filter-section">
            {/* <FilterSection setCheckeds = {setCheckeds} setGenres setGenres /> */}
            <FilterSection
              checkeds={checkeds}
              setCheckeds={setCheckeds}
              filterHandler={filterHandler}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setEndImdb={setEndImdb}
              setStartImdb={setStartImdb}
            />
          </div>
          <div className="all-movies-section">
            <h1>All Movies</h1>
            {/* <Movies movies={moviesUpcoming}/> */}
            {/* <Movies movies={moviesPopuler}/> */}
            {/* <Movies movies={moviesTopRated}/> */}
            <Movies movies={filteredMovies} />
            <div className="all-movies-button">
              <Button name="show-more" onClick={filterHandler}>
                Show More...
              </Button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
