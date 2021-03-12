const initialState = {
  authToken: '',
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        ...state,
        authToken: action.value.token,
      };

    case 'CLEAR_TOKEN':
      return {
        initialState,
      };
      
    default:
      break;
  }
  return state;
};

export default tokenReducer;
