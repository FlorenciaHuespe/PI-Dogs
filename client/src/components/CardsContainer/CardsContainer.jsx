import style from "./Cards.module.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

// import { paginatedBreeds } from "../../redux/actions";
// import { useEffect } from "react";
// import { useState } from "react";

const CardsContainer = () => {
  const allBreeds = useSelector((state) => state.allBreeds);

  //const dispatch = useDispatch();
  //   const breeds = useSelector((state) => state.breedsFilteredAndOrdered);
  //   const Page = useSelector((state) => state.Page);

  //   useEffect(() => {
  //     !breeds.length && dispatch(paginatedBreeds(Page));
  //   }, [breeds.length, dispatch, Page]);

  //   const handleNextPage = (event) => {
  //     const next = event.target.value;
  //     dispatch(paginatedBreeds(next));
  //   };

  //   const handlePrevPage = (event) => {
  //     const prev = event.target.value;
  //     dispatch(paginatedBreeds(prev));
  //   };

  //   const breedsPerPage = 8;
  //   const totalPages = Math.ceil(breeds.length / breedsPerPage);
  //   const init = (Page - 1) * breedsPerPage;
  //   const end = init + breedsPerPage;
  //   const paginated = breeds.slice(init, end);
  // const dogs = useSelector(state=<state.dogs)

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

/*{ <div className={style.buttonContainer}>
        <button
          onClick={handlePrevPage}
          value="prev"
          disabled={Page === 1}
          className={style.button}
        >
          Previous
        </button>

        <div className={style.page}>
          {Page} - {totalPages}
        </div>

        <button
          onClick={handleNextPage}
          value="next"
          disabled={Page === totalPages}
          className={style.button}
        >
          Next
        </button>
      </div>

      <div className={style.cardsContainer}>
        {paginated.length === 0 ? (
          <h1>Loading Dogs...</h1>
        ) : (
          paginated.map((breed) => <Card {...breed} key={breed.id} />)
        )}
      </div>} */
