import { CONSTANTS } from "../actions";

// CREATE MESSAGE
export const createMessage = (msg) => {
  return {
    type: CONSTANTS.CREATE_MESSAGE,
    payload: msg,
  };
};

// RETURN ERRORS
export const returnErrors = (msg, status) => {
  return {
    type: CONSTANTS.GET_ERRORS,
    payload: { msg, status },
  };
};