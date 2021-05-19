const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART':
      const ids = action.value.id;
      const idy = state.cart.findIndex((el) => {
        return el.id === ids;
      });

      if (idy === -1) {
        state.cart.push(action.value);
      }

      return {
        ...state,
        cart: state.cart,
        count: state.cart.length
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
          cart: state.cart.filter(cart => cart.id !== id),
          count: state.cart.length
        };

        case 'CLEAR_CART':
          return {
            ...state,
            cart: [],
            count: state.cart.length
          }
  
    default:
      break;
  }
  return state;
};

export default cartReducer;