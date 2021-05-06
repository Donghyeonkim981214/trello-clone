import { CONSTANTS } from "../actions";
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case CONSTANTS.USER_LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case CONSTANTS.USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload,
        };
      case CONSTANTS.LOGIN_SUCCESS:
      case CONSTANTS.REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
        };
      case CONSTANTS.AUTH_ERROR:
      case CONSTANTS.LOGIN_FAIL:
      case CONSTANTS.LOGOUT_SUCCESS:
      case CONSTANTS.REGISTER_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        };
      default:
        return state;
    }
  }