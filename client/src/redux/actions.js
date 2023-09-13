import axios from "axios";

export const GET_BREEDS = "GET_BREEDS"; //
export const GET_BREED_BY_ID = "GET_BREED_BY_ID"; //
export const GET_BREEDS_BY_NAME = "GET_BREEDS_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"; //
export const FILTER_TEMPERAMENTS = "FILTER_TEMPERAMENTS";
export const ORDER_WEIGHT = "ORDER_WEIGHT"; //
export const ORDER_ALP = "ORDER_ALP"; //
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const CLEAR_STATE = "CLEAR_STATE"; //
export const PAGINATE = "PAGINATE"; //
export const RESET = "RESET"; //

export function postBreed(state) {
  const endpoint = "http://localhost:3001/dogs";
  return async function (dispatch) {
    try {
      const fromAPI = await axios.get(endpoint);
      const breeds = fromAPI.data;
      dispatch({ type: GET_BREEDS, payload: breeds });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const getBreeds = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/dogs");
      const allBreeds = apiData.data;

      console.log("Datos de todas las razas cargados:", allBreeds); // Agrega este console.log

      dispatch({ type: GET_BREEDS, payload: allBreeds });
    } catch (error) {
      console.log(error.message);
    }
  };
};


export const getBreedById = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
      console.log(response.data); // Agregar esta línea
      dispatch({
        type: GET_BREED_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getBreedsByName = (name) => {
  return async function (dispatch) {
    try {
      if (name.trim() === "") {
        return;
      }
      const apiData = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      const breedByName = apiData.data;
      dispatch({ type: GET_BREEDS_BY_NAME, payload: breedByName });
    } catch (error) {}
  };
};

export const getTemperaments = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/temperaments");
      const temperaments = apiData.data;
      dispatch({ type: GET_TEMPERAMENTS, payload: temperaments });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filteredTemperaments = (value) => {
  return async function (dispatch) {
    try {
      dispatch({ type: FILTER_TEMPERAMENTS, payload: value });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const orderWeight = (order) => ({
  type: ORDER_WEIGHT,
  payload: order,
});

export const orderAlphabetically = (order) => ({
  type: ORDER_ALP,
  payload: order,
});

export const filterBySource = (source) => (dispatch, getState) => {
  const { allBreedsBackUp } = getState();

  const filteredBreeds = allBreedsBackUp.filter((breed) =>
    source === "api" ? !breed.db : breed.db
  );

  dispatch({
    type: FILTER_BY_SOURCE,
    payload: filteredBreeds,
  });
};

export const cleanDetails = () => {
  return { type: CLEAR_STATE };
};

export const resetBreeds = () => {
  return function (dispatch) {
    dispatch({
      type: RESET,
    });
  };
};

export function page(order) {
  return function (dispatch) {
    dispatch({
      type: PAGINATE,
      payload: order,
    });
  };
}

//promesa
// export const getBreeds = ()=>{
//     return function (dispatch){
//         fetch("http://localhost:3001/dogs")
//         .then (res => res.json())
//         .then(data => dispatch ({type: GET_BREEDS, payload: breeds}))
// }

// }
