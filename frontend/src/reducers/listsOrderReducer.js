import { CONSTANTS } from "../actions";

const initialState = {
  listsOrder: []
};

const listsOrderReducer = (state = initialState, action) => {
  switch (action.type) {

    case CONSTANTS.GET_LISTSORDER: {
      console.log("GET_LISTSORDER in listsOrderReducers.js");
      console.log(action.payload);
      return {...state, listsOrder: action.payload};
    }

    case CONSTANTS.DRAG_HAPPENED: {
      const listsOrder = state.listsOrder;
      console.log(listsOrder);
      const {
        droppableIndexEnd,
        droppableIndexStart,

        type
      } = action.payload;

      // draggin lists around
      if (type === "list") {
        const pulledOutList = listsOrder.splice(droppableIndexStart, 1);
        listsOrder.splice(droppableIndexEnd, 0, ...pulledOutList);
        return { ...state};
      }
      return state;
    }

    case CONSTANTS.ADD_LIST: {
      return {
        ...state,
        listsOrder: [...state.listsOrder, action.payload["id"]],
      };
    }

    case CONSTANTS.DELETE_LIST: return {
      ...state,
      listsOrder: state.listsOrder.filter((list) => list !== action.payload),
    };

    default:
      return state;
  }

  
};

export default listsOrderReducer;
