import { combineReducers } from "redux";

import boardsListReducer from "./boardsListReducer";
import boardsOrderReducer from "./boardsOrderReducer";
import boardReducer from "./boardReducer";
import listsReducer from "./listsReducer";
import listsOrderReducer from "./listsOrderReducer"
import cardsReducer from "./cardsReducer";

import errors from "./errors";
import messages from "./messages"
import auth from "./auth"

export default combineReducers({
  boardsList: boardsListReducer,
  boardsOrder: boardsOrderReducer,
  board: boardReducer,
  listsOrder: listsOrderReducer,
  lists: listsReducer,
  cards: cardsReducer,

  errors,
  messages,
  auth,
});
