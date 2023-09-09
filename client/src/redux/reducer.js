import {
  GET_BREEDS,
  GET_BREEDS_BY_NAME,
  GET_BREED_BY_ID,
  GET_TEMPERAMENTS,
  FILTER_TEMPERAMENTS,
  FILTER_BY_SOURCE,
  CLEAR_STATE,
  ORDER_ALP,
  ORDER_WEIGHT,
} from "./actions";

const initialState = {
  allBreeds: [], // contiene todas las razas del servidor
  allBreedsBackUp: [],
  temperaments: [],
  dogsDetail: {},
};

//allBreedsBackUp ---copia de allBreeds..para los filtros

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state, // copia del estado
        allBreeds: action.payload, // modificando la propiedad que quiero modificar dogs ---> retorna un estado nuevo
        allBreedsBackUp: action.payload,
      };
    case GET_BREED_BY_ID:
      return {
        ...state,
        dogsDetail: action.payload,
      };
    case GET_BREEDS_BY_NAME:
      return {
        ...state,
        allBreeds: action.payload,
        allBreedsBackUp: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_TEMPERAMENTS:
      return {
        ...state,
        filterTemp: action.payload,
      };
    case ORDER_WEIGHT:
      return {
        ...state,
        orderByWeight: action.payload,
      };
    case ORDER_ALP:
      return { 
        ...state, 
        orderByAlp: action.payload 
    };
    case FILTER_BY_SOURCE:
        return { 
        ...state,
        filterBySource: action.payload
        };
    case CLEAR_STATE: //limpiamos el estado de la detail
      return {
        ...state,
        dogsDetail: [],
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
