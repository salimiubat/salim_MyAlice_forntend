import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from '../actions/authactions';

const initialState = {
  token: null,
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
