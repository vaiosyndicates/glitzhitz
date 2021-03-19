const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART':
      state.cart.push(action.value);
      return {
        ...state,
        cart: state.cart,
      };

      case 'DELETE_CART':
        const id = action.value.id;
        const idx = state.cart.findIndex((el) => {
          return el.id === id;
        });
  
        if (idx !== -1) {
          state.cart.splice(idx, 1);
        }
        return {
          ...state,
          cart: state.cart,
        };     

    default:
      break;
  }
  return state;
};

export default cartReducer;