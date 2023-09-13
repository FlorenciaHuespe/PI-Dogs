import style from "./Cards.module.css";
import Card from "../Card/Card";
// import { useSelector } from "react-redux";

const CardsContainer = ({info}) => {
  // const allBreeds = useSelector((state) => state.allBreeds);

  return (
    <div className={style.cardsContainer}>
      {info.map((allBreeds) => {
        return (
          <Card
            key={allBreeds.id}
            image={allBreeds.image}
            name={allBreeds.name}
            temperaments={allBreeds.temperaments}
            maxWeight={allBreeds.maxWeight}
            minWeight={allBreeds.minWeight}
            id={allBreeds.id}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
