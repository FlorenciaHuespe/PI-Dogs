import style from "./searchbar.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedsByName } from "../../redux/actions";

const Searchbar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.trim() !== "") {
      dispatch(getBreedsByName(search));
    }
  };

  return (
    <div className={style.searchBox}>
      <input
        className={style.input}
        value={search}
        onChange={handleChange}
        placeholder="Search dogs..."
      />
      <button
        className={style.button}
        type="submit"
        onClick={handleSubmit}
      >
        🔍
      </button>
    </div>
  );
};

export default Searchbar;
