import style from "./Card.module.css";
import { Link } from "react-router-dom";
import React from "react";

const Card = ({id, name, image, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan, temperaments}) => {
  return (
        <div className={style.cardContainer}>
      <div className={style.name}>
        <h1>{name}</h1>
      </div>
      <div className={style.imageContainer}>
        <Link to={`/detail/${id}`}>
          <img src={image} alt="Dog" className={style.image} />
        </Link>
      </div>
      <p className={style.weight}>
        Weight: {minWeight} - {maxWeight} kg
      </p>
      <div className={style.info}>
        <b>Temperaments: </b>
        <p> 
          {Array.isArray(temperaments)
            ? temperaments.join(" - ")
            : temperaments}
        </p>
      </div>
      <Link to={`/detail/${id}`}>
        <button className={style.cardButton}>Más info</button>
      </Link>
    </div>
  )
}
export default Card;