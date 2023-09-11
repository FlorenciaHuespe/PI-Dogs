import style from "./Cards.module.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

// import { paginatedBreeds } from "../../redux/actions";
// import { useEffect } from "react";
// import { useState } from "react";

const CardsContainer = () => {
  const allBreeds = useSelector((state) => state.allBreeds);

  return (
    <div className={style.cardsContainer}>
      {allBreeds.map((breed) => {
        return (
          <Card
            key={breed.id}
            image={breed.image}
            name={breed.name}
            temperaments={breed.temperaments}
            maxWeight={breed.maxWeight}
            minWeight={breed.minWeight}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
