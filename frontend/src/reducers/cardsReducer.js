import { CONSTANTS } from "../actions";

const initialState = {
  cards: {}
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {

    case CONSTANTS.ADD_CARD:{
      console.log("ADD_CARDS in cardsReducers.js")
      const newCard = action.payload['newCard']
      console.log(action.payload)
      return {...state, cards: Object.assign({}, state.cards, newCard)};
  }

    case CONSTANTS.GET_CARDS:{
      console.log("GET_CARDS in cardsReducers.js")
      console.log(action.payload)
      return {
        ...state,
        cards: action.payload
    };
  }

    case CONSTANTS.EDIT_CARD_TASK: {
      const { id, editedCard } = action.payload;
      const card = state.cards[id];
      card.task = editedCard[id].task;
      return {...state, cards: {...state.cards, [id]: card}}
    }

    case CONSTANTS.DELETE_CARD: {
      const { cardId } = action.payload;
      const newCards = state.cards;
      delete newCards[cardId];
      return {...state, cards: newCards}
    }

    default:
      return state;
  }

};

export default cardsReducer;
