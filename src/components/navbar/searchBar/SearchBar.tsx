import React, { useState } from "react";
import "./SearchBar.css";
import { AutoComplete } from "antd";
import axios from "axios";
import { SEARCH_URL } from "../../../config/Url";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  let navigate = useNavigate ();
  const [inputValue, setInputValue] = useState<string>("");
  const [movieData, setMovieData] = useState([]);
  

  axios
    .get(SEARCH_URL + "&query=" + inputValue)
    .then((res) => setMovieData(res.data.results));

  const optionsGenerator = () => {
    let options: any = [];
    movieData.map((el: any) => options.push({ value: el.id, label: el.title }));
    return options;
  };

  const searchHandler = (e: string) => {
    setInputValue(e);
  };

  const goToDetailPage = (id:number) => {
  navigate(`detail/${id}`);
    
  }

  return (
    <div className="search-bar">
      <AutoComplete
        onChange={(e) => searchHandler(e)}
        // onSearch={handleSearch}
        placeholder="Film Ara"
        style={{ width: "250px" }}
        options={optionsGenerator()}
        onSelect={(e)=>goToDetailPage(e)}
      />

    </div>
  );
};

export default SearchBar;
