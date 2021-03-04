const initialState = {
  profile: {
    name: null,
    address : null,
    phone_number: null,
    email: null,
    gender: null,
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        isLogin: true,
        profile: {
          ...state.profile,
          name: action.value.name,
          address: action.value.address,
          phone_number: action.value.phone_number,
          email: action.value.email,
          gender: action.value.gender,
        },
      };

    default:
      break;
  }
  return state;
};

export default profileReducer;