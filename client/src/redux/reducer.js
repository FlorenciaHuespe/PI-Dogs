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
  PAGINATE,
} from "./actions";

const initialState = {
  allBreeds: [], // contiene todas las razas del servidor
  allBreedsBackUp: [],
  breedsFiltered: [],
  filters: false,
  temperaments: [],
  dogsDetail: {},
  currentPage: 0,
};

//allBreedsBackUp ---copia de allBreeds..para los filtros

const rootReducer = (state = initialState, action) => {
  const ITEMS_PER_PAGE = 8;

  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state, // copia del estado
        allBreeds: [...action.payload].splice(0, ITEMS_PER_PAGE), // modificando la propiedad que quiero modificar dogs ---> retorna un estado nuevo
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
      switch (action.payload) {
      case "weightMin":
        let weightMin = [...state.allBreedsBackUp].filter(
          (b) => b.maxWeight < 50
        );
        return {
          ...state,
          allBreeds: [...weightMin].splice(0, ITEMS_PER_PAGE),
          breedsFiltered: weightMin,
          currentPage: 0,
          filters:true,
        };
      case "weightMax":
        let weightMax = [...state.allBreedsBackUp].filter(
          (b) => b.maxWeight >= 50
        );
        return {
          ...state,
          allBreeds: [...weightMax].splice(0, ITEMS_PER_PAGE),
          breedsFiltered: weightMax,
          currentPage: 0,
          filters:true,
        };
      }

    case ORDER_ALP:
      switch (action.payload) {
        case "AZ":
          let asc = [...state.allBreedsBackUp].sort((prev, next) => {
            if (prev.name.toLowerCase() > next.name.toLowerCase()) return 1; //ordeno en base al nombre el obj allBreedsBackUp
            if (prev.name.toLowerCase() < next.name.toLowerCase()) return -1;
            return 0;
          });
          return {
            ...state,
            allBreeds: [...asc].splice(0, ITEMS_PER_PAGE),
            allBreedsBackUp: asc,
            currentPage: 0,
          };
        case "ZA":
          let des = [...state.allBreedsBackUp].sort((prev, next) => {
            if (prev.name.toLowerCase() > next.name.toLowerCase()) return -1; //ordeno en base al nombre el obj allBreedsBackUp
            if (prev.name.toLowerCase() < next.name.toLowerCase()) return 1;
            return 0;
          });
          return {
            ...state,
            allBreeds: [...des].splice(0, ITEMS_PER_PAGE),
            allBreedsBackUp: des,
            currentPage: 0,
          };
      }
      return {
        ...state,
        orderByAlp: action.payload,
      };
    case FILTER_BY_SOURCE:
      return {
        ...state,
        filterBySource: action.payload,
      };
    case CLEAR_STATE: //limpiamos el estado de la detail
      return {
        ...state,
        dogsDetail: [],
      };
    case PAGINATE:
      const next_page = state.currentPage + 1;
      const prev_page = state.currentPage - 1;
      const firstIndex =
        action.payload === "next"
          ? next_page * ITEMS_PER_PAGE
          : prev_page * ITEMS_PER_PAGE;

          if(state.filters){
            if (action.payload === "next" && firstIndex >= state.breedsFiltered.length) return state;
            else if (action.payload === "prev" && prev_page < 0) return state;
            return {
              ...state,
              allBreeds: [...state.breedsFiltered].splice(
                firstIndex,
                ITEMS_PER_PAGE
              ), //desde el 1er indice, que renderices la cant indicada 8
              currentPage: action.payload === "next" ? next_page : prev_page,
            };
          }

      if (
        action.payload === "next" &&
        firstIndex >= state.allBreedsBackUp.length
      )
        return state;
      else if (action.payload === "prev" && prev_page < 0) return state;
      return {
        ...state,
        allBreeds: [...state.allBreedsBackUp].splice(
          firstIndex,
          ITEMS_PER_PAGE
        ), //desde el 1er indice, que renderices la cant indicada 8
        currentPage: action.payload === "next" ? next_page : prev_page,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
