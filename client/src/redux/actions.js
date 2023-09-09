import axios from "axios";

export const GET_BREEDS = "GET_BREEDS";
export const GET_BREED_BY_ID = "GET_BREED_BY_ID";
export const GET_BREEDS_BY_NAME = "GET_BREEDS_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_TEMPERAMENTS = "FILTER_TEMPERAMENTS";
export const ORDER_WEIGHT = "ORDER_WEIGHT";
export const ORDER_ALP = "ORDER_ALP";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const CLEAR_STATE = "CLEAR_STATE";

export function postBreed(state) {
  return async function (dispatch) {
    try {
      await axios.post("http://localhost:3001/dogs", state);
      alert("Raza creada exitosamente");
    } catch (error) {
      alert("La raza no se creó, hubo un error");
    }
  };
}

export const getBreeds = () => {
  //action creator
  return async function (dispatch) {
    //retorna una funcion
    const apiData = await axios.get("http://localhost:3001/dogs"); // hace una peticion
    const allBreeds = apiData.data;
    dispatch({ type: GET_BREEDS, payload: allBreeds }); //despacha la action
  };
};

export const getBreedById = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get`http://localhost:3001/dogs/${id}`;
    const breedById = apiData.data;
    dispatch({ type: GET_BREED_BY_ID, payload: breedById });
  };
};

export const getBreedsByName = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get`http://localhost:3001/dogs?name=${name}`;
    const breedByName = apiData.data;
    dispatch({ type: GET_BREEDS_BY_NAME, payload: breedByName });
  };
};

export const getTemperaments = () => {
  return async function (dispatch) {
    try{
    const apiData = await axios.get("http://localhost:3001/temperaments");
    const temperaments = apiData.data;
    dispatch({ type: GET_TEMPERAMENTS, payload: temperaments });
    } catch (error){
      console.log(error);
    }
  };
};
// export function getTemperaments() {
//   return async function (dispatch) {
//     try {
//       const APITemperaments = await axios.get("http://localhost:3001/temperaments");
//       if (APITemperaments.data && Array.isArray(APITemperaments.data)) {
//         const temperaments = APITemperaments.data
//           .map((temp) => ({
//             id: temp.id,
//             name: temp.name,
//           }))
//           .sort((a, b) => a.name.localeCompare(b.name));
//         console.log("Temperaments from API:", temperaments);
//         return dispatch({
//           type: GET_TEMPERAMENTS,
//           payload: temperaments,
//         });
//       } else {
//         console.log("API response does not contain valid data.");
//       }
//     } catch (error) {
//       console.log("Error fetching temperaments:", error.message);
//     }
//   };
// }

export const filteredTemperaments = (value) => ({
  type: FILTER_TEMPERAMENTS,
  payload: value,
});

export const orderWeight = (value) => ({
  type: ORDER_WEIGHT,
  payload: value,
});

export const orderAlphabetically = (value) => ({
  type: ORDER_ALP,
  payload: value,
});

export const filterBySource = (value) => ({
  type: FILTER_BY_SOURCE,
  payload: value,
});
// export const filterBySource = () => ({
//   dispatch({type: FILTER_BY_SOURCE})

export const cleanDetails = () => {
  return { type: CLEAR_STATE };
};

//promesa
// export const getBreeds = ()=>{
//     return function (dispatch){
//         fetch("http://localhost:3001/dogs")
//         .then (res => res.json())
//         .then(data => dispatch ({type: GET_BREEDS, payload: breeds}))
// }

// }


