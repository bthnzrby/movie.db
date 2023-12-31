import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { AutoComplete } from "antd";
import axios from "axios";
import { SEARCH_URL } from "../../../config/Url";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate ();
  const [inputValue, setInputValue] = useState<string>("");
  const [movieData, setMovieData] = useState([]);
  
  useEffect(() => {
    axios
    .get(SEARCH_URL + "&query=" + inputValue)
    .then((res) => setMovieData(res.data.results));

  }, [inputValue]);


  const optionsGenerator = () => {
    let options: any = [];
    movieData.map((el: any) => options.push({ value: el.id, label: el.title }));
    return options;
  };

  const searchHandler = (e: string) => {
    setInputValue(e);
  };

  const goToDetailPage = (id:number) => {
  navigate(`/detail/${id}`);
  setInputValue("");
  }
  
  return (
    <div className="search-bar">
      <AutoComplete
        className="input"
        value={inputValue}
        onChange={(e) => searchHandler(e)}
        // onSearch={handleSearch}
        placeholder="Search Movie"
        style={{ width: "250px" }}
        options={optionsGenerator()}
        onSelect={(e)=>goToDetailPage(parseInt(e)) }
      />

    </div>
  );
};

export default SearchBar;
