import { CONSTANTS } from "../actions";

const initialState = {
  boardsOrder: []
};

const boardsOrderReducer = (state = initialState, action) => {
  switch (action.type) {

    case CONSTANTS.GET_BOARDSORDER: {
      console.log("GET_BOARDSORDER in boardOrderReducers.js");
      console.log(action.payload);
      return {...state, boardsOrder: action.payload};
    }

    case CONSTANTS.ADD_BOARD: {
      return {
        ...state,
        boardsOrder: [...state.boardsOrder, action.payload['id']],
      };
    }

    default:
      return state;
  }
};

export default boardsOrderReducer;
