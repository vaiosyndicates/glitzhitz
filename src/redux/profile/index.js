const initialState = {
  profile: {
    id: null,
    name: null,
    address : null,
    phone_number: null,
    email: null,
    gender: null,
    birthday: null,
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
          id: action.value.id,
          name: action.value.name,
          address: action.value.address,
          phone_number: action.value.phone,
          email: action.value.email,
          gender: action.value.gender,
          birthday: action.value.birth,
        },
      };

    case 'CLEAR_PROFILE':
      return {
        initialState
      };
      
    default:
      break;
  }
  return state;
};

export default profileReducer;