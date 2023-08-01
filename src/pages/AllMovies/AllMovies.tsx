import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { DISCOVER_URL } from "../../config/Url";
import axios from "axios";
import { MoviesMainOutput } from "../../components/mainPageComponents/FilmCarousel";

import "./AllMovies.css";
import Movies from "./Movies/Movies";
import FilterSection from "../../components/FilterSection/FilterSection";
import { Button } from "antd";

const AllMovies = () => {
    const [pageCount, setPageCount] = useState<number>(1);
    const [checkeds, setCheckeds] = useState<Array<string>>([]);
    const [filteredMovies, setFilteredMovies] = useState<Array<MoviesMainOutput>>(
        []
    );
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [startImdb, setStartImdb] = useState<1 | 10 | null>();
    const [endImdb, setEndImdb] = useState<1 | 10 | null>();


    useEffect(() => {
        axios.get(DISCOVER_URL + "&page=" + pageCount).then((res) => {
            setFilteredMovies((prevAllMovies) => [
                ...prevAllMovies,
                ...res.data.results,
            ]);
        });
    }, []);

    const filterHandler = (e: any) => {
        if (e.target.innerText === "Show More") setPageCount(pageCount + 1);

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
                if (e.target.innerText !== "Show More") {
                    setFilteredMovies(res.data.results);
                } else {
                    setFilteredMovies((prevFilteredMovies) => [
                        ...prevFilteredMovies,
                        ...res.data.results,
                    ]);
                }

            });
    };

    return (
        <div className="all-movies">
            <Navbar />
            <div className="all-movies-section-title">
                <div className="all-movies-section-content">
                    <div className="filter-section">

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
                        <Movies movies={filteredMovies} />
                        <div className="all-movies-button">
                            <Button name="show-more" onClick={filterHandler}>
                                Show More
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllMovies;
