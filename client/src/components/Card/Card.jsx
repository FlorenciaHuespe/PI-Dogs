import style from "./Card.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = (props) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.imageContainer}>
        <Link to={`/detail/${props.id}`}>
          <img src={props.image} alt="Dog" className={style.image} />
        </Link>
      </div>
      <Link to={`/detail/${props.id}`}>
        <div className={style.name}>
          <h1>{props.name}</h1>
        </div>
      </Link>
        <p className={style.weight}>
          Weight : {props.minWeight} - {props.maxWeight} kg
        </p>
      <div className={style.info}>
      <b>Temperaments :</b>
        <p>{props.temperaments ? props.temperaments.join(" - ") : ""}</p>
  
      </div>
      <Link to={`/detail/${props.id}`}>
        <button className={style.cardButton}>Más info</button>
      </Link>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  minWeight: PropTypes.number.isRequired,
  maxWeight: PropTypes.number.isRequired,
  temperaments: PropTypes.string.isRequired,
};

export default Card;
