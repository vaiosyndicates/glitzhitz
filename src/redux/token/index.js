const initialState = {
  authToken: '',
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        ...state,
        authToken: action.value[0].token,
      };

    default:
      break;
  }
  return state;
};

export default tokenReducer;
