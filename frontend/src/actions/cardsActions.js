import { CONSTANTS } from "../actions";
import { createMessage, returnErrors } from './messages';
import axios from 'axios';
import { tokenConfig } from './auth';

//ADD CARD
export const addCard = (listID, text, boardId) => {
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  return async (dispatch, getState) => {
  console.log("add a card in cardsAction.js");
  console.log(boardId);
  await axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/card_api/cards/',
    data: {
      listId: listID,
      task: text,
      boardId: boardId,
      id: "",
    },
    headers: {
      'Content-type':'application/json',
      'Authorization':tokenConfig(getState).headers['Authorization']
     },
    withCredentials: true
  }).then((res) => {
      dispatch({
        type: CONSTANTS.ADD_CARD,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
  };
}

//get cards in certain board
export const getCards = (boardId) => {
  return async (dispatch, getState) => {
    console.log("get cards in cardsAction.js");
    await axios
      .get('http://127.0.0.1:8000/card_api/cards/'+boardId+'/get-cards/', tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: CONSTANTS.GET_CARDS,
          payload: res.data,
        });
      })
      .catch(err => console.log(err));
  }
};

export const editCardTask = (cardId, task) => {
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  const pk = cardId.split("-");
  return async (dispatch, getState) => {
    console.log("edit Card's task in cardsAction.js");
    await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:8000/card_api/cards/'+pk[1]+'/',
      data: {
        task: task,
        type: "task",
    },
    headers: {
      'Content-type':'application/json',
      'Authorization':tokenConfig(getState).headers['Authorization']
     },
    }).then((res) => {
        dispatch({
          type: CONSTANTS.EDIT_CARD_TASK,
          payload: res.data,
        });
      })
      .catch(err => console.log(err));
  }
};

export const deleteCard = (id) => {
  const pk = id.split("-");
  console.log(pk)
  return async (dispatch, getState) => {
    console.log("delete a Card in cardsAction.js")
    await axios
      .delete('http://127.0.0.1:8000/card_api/cards/'+pk[1]+'/', tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: CONSTANTS.DELETE_CARD,
          payload: res.data,
      });
    })
    .catch((err) => console.log(err));
  }
};

//Sort Cards
export const sortCards = (sortedCards, startIndex) => {
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  return (dispatch, getState) => {
  console.log("sort cards in same list");
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/card_api/cards/reorder-cards/',
    data: {
      reorderedCards: sortedCards,
      startIndex: startIndex,
      type: "in_list",
    },
    headers: {
      'Content-type':'application/json',
      'Authorization':tokenConfig(getState).headers['Authorization']
     }
    })/* .then((res) => {
      dispatch({
        type: CONSTANTS.SORT_CARDS_IN_SAME_LIST,
        payload: res.data,
      });
    })
    .catch(err => console.log(err)); */
  };
}

//Sort Cards
export const sortCardsAnotherList = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
  ) => {
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  const startListId = droppableIdStart.split("-");
  const endListId = droppableIdEnd.split("-");
  const cardId = draggableId.split("-");
  return (dispatch, getState) => {
  console.log("move card to another list");
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/card_api/cards/move-card/',
    data: {
      "droppableIdStart": startListId[1],
      "droppableIdEnd": endListId[1],
      "droppableIndexStart": droppableIndexStart,
      "droppableIndexEnd": droppableIndexEnd,
      "draggableId": cardId[1],
    },
    headers: {
      'Content-type':'application/json',
      'Authorization':tokenConfig(getState).headers['Authorization']
     }
    })
    .catch(err => console.log(err));
  };
}
