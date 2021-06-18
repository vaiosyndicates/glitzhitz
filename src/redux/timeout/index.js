const initialState = {
  timeout: {
    status: false,
    code: '00',
  },
};

const timeoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TIMEOUT':
      return {
        ...state,
        timeout: {
          ...state.timeout,
          status: action.value.status,
          code: action.value.code,
        },
      };

    default:
      break;
  }
  return state;
};

export default timeoutReducer;