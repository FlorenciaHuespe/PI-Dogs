import style from "./home.module.css";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, page, orderAlphabetically, orderWeight, resetBreeds } from "../../redux/actions";
import imgGit from "./img/github.png";
import imgLinkedin from "./img/linkedin.png";

const Home = () => {
  const dispatch = useDispatch();
  const allBreeds = useSelector((state) => state.allBreeds); //suscripcion al estado allBreeds por medio del useSelector(hook), ingresa al estado y extrae solo lo que le interesa
  // console.log(allBreeds);


  useEffect(() => {
    //cuando se monte home, quiero ejectutar el dispatch
    dispatch(getBreeds()); // despacho la function de action
    //dispatch(clear)
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

  return (
    <div className={style.containerHome}>
    <div>
      <button onClick={reset}>RESET</button>
    </div>
      
      <div className={style.page}>
        <button name="AZ" onClick={filters}>
          A-Z
        </button>
        <button name="ZA" onClick={filters}>
          Z-A
        </button>
        <button name="weightMin" onClick={filtersWeight}>{"Weight < 50 Kg"}</button>
        <button name="weightMax" onClick={filtersWeight}>{"Weight > 50 Kg"}</button>
        <button name="prev" onClick={pagination} className={style.button}>
          Prev
        </button>
        <button name="next" onClick={pagination} className={style.button}>
          Next
        </button>
        
      </div>
      <CardsContainer info={allBreeds} />
      <footer className={style.footer}>
  <p>
    © 2023 Florencia Huespe. Todos los derechos reservados.
    <a href="https://github.com/FlorenciaHuespe" target="_blank" rel="noopener noreferrer">
            <img src={imgGit} alt="Github" className={style.imageCheck} />
          </a>
          <a href="https://www.linkedin.com/in/florencia-huespe-6587441b5/" target="_blank" rel="noopener noreferrer">
            <img src={imgLinkedin} alt="Linkedin" className={style.imageCheck} />
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;

//---------- HOOKS -----------
//cuando se monta
// lo manejamos con useEffect() - manejamos el ciclo de vida
// que haga el dispatch
// useDispatch
