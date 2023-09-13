import style from "./home.module.css";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBreeds,
  page,
  orderAlphabetically,
  orderWeight,
  resetBreeds,
  getTemperaments,
  filteredTemperaments,
  filterBySource,
} from "../../redux/actions";
import imgGit from "./img/github.png";
import imgLinkedin from "./img/linkedin.png";

const Home = () => {
  const dispatch = useDispatch();
  // const [state, setState] = useState({});
  const [selectedTemperament, setSelectedTemperament] = useState("");
  const selectedSource = useSelector((state) => state.selectedSource);

  const allBreeds = useSelector((state) => state.allBreeds); //suscripcion al estado allBreeds por medio del useSelector(hook), ingresa al estado y extrae solo lo que le interesa
  const allTemperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getBreeds());
  }, []);

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const pagination = (e) => {
    dispatch(page(e.target.name));
  };

  const filters = (e) => {
    dispatch(orderAlphabetically(e.target.name));
  };

  const filtersWeight = (e) => {
    dispatch(orderWeight(e.target.name));
  };

  const reset = () => {
    dispatch(resetBreeds());
  };

  const handleChangeTemperament = (event) => {
    const selectedTemperament = event.target.value;
    console.log("Temperament seleccionado:", selectedTemperament); // Agrega este console.log
    dispatch(filteredTemperaments(selectedTemperament));
  };
  

  const handleChangeSource = (event) => {
    const selectedSource = event.target.value;
    dispatch(filterBySource(selectedSource));
  };

  return (
    <div className={style.containerHome}>
      <div>
        <button className={style.reset} onClick={reset}>
          RESET
        </button>
      </div>
      <div className={style.page}>
        <button className={style.btn} name="AZ" onClick={filters}>
          A-Z
        </button>
        <button className={style.btn} name="ZA" onClick={filters}>
          Z-A
        </button>
        <button className={style.btn} name="weightMin" onClick={filtersWeight}>
          {"Weight < 50 Kg"}
        </button>
        <button className={style.btn} name="weightMax" onClick={filtersWeight}>
          {"Weight > 50 Kg"}
        </button>
        <button name="prev" onClick={pagination} className={style.buttonP}>
          Prev
        </button>
        <button name="next" onClick={pagination} className={style.buttonP}>
          Next
        </button>
        <label>Source</label>
        <select
          className={style.option}
          value={selectedSource}
          onChange={handleChangeSource} // Agrega este evento onChange
        >
          <option className={style.option} value="api">
            API
          </option>
          <option className={style.option} value="database">
            DB
          </option>
        </select>
        <label>Temperaments</label>
        <select
          name="temperaments"
          onChange={handleChangeTemperament}
          className={style.option}
        >
          {Array.isArray(allTemperaments) &&
            allTemperaments?.map((t) => (
              <option className={style.option} value={t} key={t}>
                {t}
              </option>
            ))}
        </select>
      </div>
      <CardsContainer info={allBreeds} />
      <footer className={style.footer}>
        <p>
          © 2023 Florencia Huespe. Todos los derechos reservados.
          <a
            href="https://github.com/FlorenciaHuespe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={imgGit} alt="Github" className={style.imageCheck} />
          </a>
          <a
            href="https://www.linkedin.com/in/florencia-huespe-6587441b5/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={imgLinkedin}
              alt="Linkedin"
              className={style.imageCheck}
            />
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
