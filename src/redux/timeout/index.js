const initialState = {
  timeout: false,
};

const timeoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TIMEOUT':
      return {
        ...state,
        timeout: action.value,
      };

    default:
      break;
  }
  return state;
};

export default timeoutReducer;