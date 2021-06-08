const initialState = {
  order: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      state.order.push(action.value);

      return {
        ...state,
        order: state.order,
      };


    case 'CLEAR_ORDER':
      return {
        ...state,
        order: [],
      }
  
    default:
      break;
  }
  return state;
};

export default orderReducer;