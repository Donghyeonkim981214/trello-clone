import { CONSTANTS } from "../actions";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}