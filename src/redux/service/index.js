const initialState = {
  service: null,
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_SERVICE':
      return {
        ...state,
       service: action.value,
      };

    case 'CLEAR_SERVICE':
      return {
        initialState
      };
      
    default:
      break;
  }
  return state;
};

export default serviceReducer;