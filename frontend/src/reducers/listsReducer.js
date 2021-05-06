import { CONSTANTS } from "../actions";

const initialState = {
  lists: {}
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {

    case CONSTANTS.ADD_CARD: {
      const { listId, id } = action.payload;
      const list = state.lists[listId];
      list.cards.push(id);
      return { ...state, [listId]: list };
    }

    //cards data is in lists so cards reordering execute in listsReducer.js
    case CONSTANTS.DRAG_HAPPENED:{
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,

        type
      } = action.payload;

      // draggin lists around - the listOrderReducer should handle this
      if (type === "list") {
        return state;
      }

      // cards in the same list
      if (droppableIdStart === droppableIdEnd) {
        const { lists } = action.payload;
        const list = lists[droppableIdStart];
        console.log(droppableIdStart);
        console.log(lists);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
        //return { ...state, [droppableIdStart]: list };
        return {...state, lists: {...state.lists, [droppableIdStart]: list}}
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        console.log("check");
        // find the list where the drag happened
        const listStart = state.lists[droppableIdStart];
        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = state.lists[droppableIdEnd];

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
        return {
          ...state,
          lists:{...state.lists, [droppableIdStart]: listStart,
            [droppableIdEnd]: listEnd}
        };
      }
      return state;
    }

    case CONSTANTS.DELETE_CARD: {
      const { listId, cardId } = action.payload;

      const list = state.lists[listId];
      const newCards = list.cards.filter(cardID => cardID !== cardId);

      return { ...state, lists: {...state.lists, cards: newCards}};
    }

    case CONSTANTS.DELETE_LIST: {
      const { listID } = action.payload;
      const newState = state;
      delete newState[listID];
      return newState;
    }

    case CONSTANTS.GET_LISTS:{
        console.log("GET_LISTS in listsReducers.js")
        console.log(action.payload)
        return {
          ...state,
          lists: action.payload
      };
    }

    case CONSTANTS.ADD_LIST: {
      const newList = action.payload['newList']
      return {...state, lists: Object.assign({}, state.lists, newList)};
    }

    case CONSTANTS.EDIT_LIST_TITLE: {
      const editedList = action.payload['editedList']
      const listID = state[action.payload['id']];
      return {...state, lists:{...state.lists, [listID]: editedList}};
    }

    default:
      return state;
  }
};

export default listsReducer;
