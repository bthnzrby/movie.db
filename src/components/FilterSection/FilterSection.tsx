import {
  Button,
  Checkbox,
  Collapse,
  CollapseProps,
  DatePicker,
  DatePickerProps,
  InputNumber,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GENRE_URL } from "../../config/Url";

// import Movies from "../../pages/AllMovies/Movies/Movies";

interface GenresOutput {
  id: number;
  name: string;
}

interface CheckedsOutput {
  checkeds: string[];
  setCheckeds: React.Dispatch<React.SetStateAction<string[]>>;
  filterHandler: (e: any) => void;
  setStartDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setStartImdb: React.Dispatch<React.SetStateAction<1 | 10 | null | undefined>>;
  setEndImdb: React.Dispatch<React.SetStateAction<1 | 10 | null | undefined>>;
}

const FilterSection = ({
  setCheckeds,
  checkeds,
  filterHandler,
  setStartDate,
  setEndDate,
  setStartImdb,
  setEndImdb,
}: CheckedsOutput) => {
  const [genres, setGenres] = useState<Array<GenresOutput>>([]);

  useEffect(() => {
    axios.get(GENRE_URL).then((res) => {
      setGenres(res.data.genres);

      // console.log(res.data.genres);
    });
  }, []);

  // useEffect(() => {
  //   axios.get(GENRE_URL).then((res) => {
  //     setGenres(res.data.genres);

  // console.log(res.data.genres);
  //   });
  // }, []);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const changeChecbox = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setCheckeds([...checkeds, e.target.value]);
    } else {
      setCheckeds(checkeds.filter((checked) => checked !== e.target.value));
    }
    // console.log(checkeds);
  };

  // const setStartDate: DatePickerProps["onChange"] = (date, dateString) => {
  //   console.log(date, dateString);

  // const onClick = () =>{

  // }

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Genres",
      children: (
        <div>
          {genres &&
            genres.map((genre: GenresOutput) => (
              <div>
                <Checkbox value={genre.id} onChange={changeChecbox}>
                  {genre.name}
                </Checkbox>
              </div>
            ))}
        </div>
      ),
      //   <div>
      //   <Checkbox onChange={changeChecbox}>Checkbox</Checkbox>
      // </div>
    },
    {
      key: "2",
      label: "Year",
      children: (
        <p>
          <DatePicker onChange={(e, a) => setStartDate(a)} />
          <DatePicker onChange={(e, a) => setEndDate(a)} />
        </p>
      ),
    },
    {
      key: "3",
      label: "IMDB",
      children: (
        <p>
          {" "}
          <InputNumber
            placeholder="first imdb"
            min={1}
            max={10}
            onChange={(e) => setStartImdb(e)}
          />
          <InputNumber
            placeholder="last imdb"
            min={1}
            max={10}
            onChange={(e) => setEndImdb(e)}
          />
        </p>
      ),
    },
  ];

  return (
    <div className="filter">
      <h1>Use Filter</h1>
      <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
      <Button onClick={filterHandler}> Filtreyi Onayla</Button>

      {/* <Movies movies={denem} /> */}
      {/* <Button onClick={onClik}>tıkla bana</Button> */}
    </div>
  );
};

export default FilterSection;
