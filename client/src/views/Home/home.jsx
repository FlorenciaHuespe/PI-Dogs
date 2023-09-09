import style from "./home.module.css";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds } from "../../redux/actions";


const Home = () => {
  const dispatch = useDispatch();

  const allBreeds = useSelector((state) => state.allBreeds) //suscripcion al estado allBreeds por medio del useSelector(hook), ingresa al estado y extrae solo lo que le interesa

  useEffect(() => { //cuando se monte home, quiero ejectutar el dispatch
    dispatch(getBreeds()); // despacho la function de action
    //dispatch(clear)
  },[]);


  return (
    <div className={style.containerHome}>
      <CardsContainer info={allBreeds} />
      <footer className={style.footer}>
        <p>
          © 2023 Florencia Huespe. Todos los derechos reservados.
          <a
            href="https://github.com/FlorenciaHuespe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="./img/github"
              alt="Github"
              className={`${style.imageCheck} ${style.footerImage}`}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/florencia-huespe-6587441b5/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="./img/linkedin"
              alt="Linkedin"
              className={`${style.imageCheck} ${style.footerImage}`}
            />
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