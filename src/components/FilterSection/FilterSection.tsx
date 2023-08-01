import {
    Button,
    Checkbox,
    Collapse,
    CollapseProps,
    DatePicker,
    InputNumber,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GENRE_URL } from "../../config/Url";


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

        });
    }, []);

    const changeChecbox = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setCheckeds([...checkeds, e.target.value]);
        } else {
            setCheckeds(checkeds.filter((checked) => checked !== e.target.value));
        }
    };

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
        },
        {
            key: "2",
            label: "Year",
            children: (
                <p>
                    <DatePicker onChange={(e, date) => setStartDate(date)} />
                    <DatePicker onChange={(e, date) => setEndDate(date)} />
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
            <Collapse items={items} defaultActiveKey={["1"]} />
            <Button onClick={filterHandler}> Filtreyi Onayla</Button>
        </div>
    );
};

export default FilterSection;
