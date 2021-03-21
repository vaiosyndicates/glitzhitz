const initialState = {
  maps: {
    latitude: 0,
    longitude: 0,
  },
};

const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COORDINATE':
      return {
        ...state,
        maps: {
          latitude: action.value.latitude,
          longitude: action.value.longitude,
        },
      };

      case 'CLEAR_MAPS':
        return {
          ...state,
          maps: {
            ...state.maps,
            latitude: 0,
            longitude: 0,
          }
        }

    default:
      break;
  }
  return state;
};

export default mapsReducer;