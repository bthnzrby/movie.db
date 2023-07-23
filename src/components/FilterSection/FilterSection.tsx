import { Button, Checkbox, Collapse, CollapseProps } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GENRE_URL } from "../../config/Url";

interface GenresOutput {
  id: number;
  name: string;
}

const FilterSection = () => {
  const [genres, setGenres] = useState<Array<GenresOutput>>([]);
  const [checkeds, setCheckeds] = useState<Array<string>>([])

  useEffect(() => {
    axios.get(GENRE_URL).then((res) => {
      setGenres(res.data.genres);

      // console.log(res.data.genres);
    });
  }, []);

  useEffect(() => {
    axios.get(GENRE_URL).then((res) => {
      setGenres(res.data.genres);

      // console.log(res.data.genres);
    });
  }, []);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const changeChecbox = (e: CheckboxChangeEvent) => {
    
    if(e.target.checked ){
      setCheckeds([...checkeds,e.target.value]) 
     
    }else{
      setCheckeds(checkeds.filter(checked => checked !== e.target.value))
    }
    // console.log(checkeds);
  };

  const onClick = () =>{

  }



  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Genres",
      children: 
        <div>
          {genres &&
            genres.map((genre: GenresOutput) => (
              <div>
                <Checkbox value={genre.id} onChange={changeChecbox}>{genre.name}</Checkbox>
              </div>
            ))}
        </div>
      ,
      //   <div>
      //   <Checkbox onChange={changeChecbox}>Checkbox</Checkbox>
      // </div>
    },
    {
      key: "2",
      label: "Year",
      children: <p></p>,
    },
    {
      key: "3",
      label: "IMDB",
      children: <p></p>,
    },
  ];

  return (
    <div className="filter">
      <h1>Use Filter</h1>
      <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
      <Button onClick={onClick}>tıkla bana</Button>
    </div>
  );
};

export default FilterSection;
