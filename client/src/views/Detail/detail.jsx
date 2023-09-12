import style from "./detail.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBreedById, cleanDetails } from "../../redux/actions";

const Detail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const dogsDetail = useSelector((state) => state.dogsDetail);
 

  useEffect(() => {
    dispatch(getBreedById(params.id));
    return () => dispatch(cleanDetails());
  }, []);

  return (
    <div className={style.contenedorPadre}>
      <div className={style.container1}>
        <b className={style.id}>ID: {dogsDetail.id}</b>
        <div className={style.name}>
          <p>{dogsDetail.name}</p>
        </div>
        <div className={style.container2}>
        <div className={style.imageContainer}>
          <img className={style.image} src={dogsDetail.image} alt="image" />
        </div>
        <div className={style.infoContainer}>
        <div className={style.characteristic}>
          <b>Height: </b>{" "}
          <p>
            {dogsDetail.minHeight} - {dogsDetail.maxHeight} cm
          </p>
          <b>Weight: </b>
          <p>
            {dogsDetail.minWeight} - {dogsDetail.maxWeight} kg
          </p>
          <b>Temperaments: </b>
          <p>
            {Array.isArray(dogsDetail.temperaments)
              ? dogsDetail.temperaments.join(" - ")
              : dogsDetail.temperaments}
          </p>
          <b>Life Span: </b>
          <p>
            {dogsDetail.minLifeSpan} - {dogsDetail.maxLifeSpan} years
          </p>
          <b>Breed Group: </b>
          <p>{dogsDetail.breed_group}</p>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Detail;
