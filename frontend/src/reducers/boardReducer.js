import { CONSTANTS } from "../actions";

const initialState = {
  board: {}
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    //get a board
    case CONSTANTS.GET_BOARD:{
      console.log("GET_BOARD in boardsReducers.js")
      console.log(action.payload)
      return {
        ...state,
        board: action.payload
      };
    }

    default:
      return state;
  }
};

export default boardReducer;
