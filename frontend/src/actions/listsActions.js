import { CONSTANTS } from "../actions";
import { createMessage, returnErrors } from './messages';
import axios from 'axios';
import { tokenConfig } from './auth';

//ADD LIST
export const addList = (title, boardId) => {
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  return async (dispatch, getState) => {
  console.log("add a list in listsAction.js");
  await axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/list_api/lists/',
    data: {
      title: title,
      id: "",
      boardId: boardId,
      cards: []
    },
    headers: {
      'Content-type':'application/json',
      'Authorization':tokenConfig(getState).headers['Authorization']
     },
    withCredentials: true
  }).then((res) => {
      dispatch({
        type: CONSTANTS.ADD_LIST,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
  };
}

//list가 정렬되었을 때
export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return (dispatch, getState) => {
    const board = getState().board.board;
    const lists = getState().lists.lists;
    dispatch({
      type: CONSTANTS.DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
        board,
        lists,
      }
    });
  };
};

//Sort Lists -> backend에 전달
export const reorderLists = (reorderedLists, startIndex) => {
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  return (dispatch, getState) => {
  console.log("reorderLists");
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/list_api/lists/reorder-lists/',
    data: {
      reorderedLists: reorderedLists,
      startIndex: startIndex,
    },
    headers: {
      'Content-type':'application/json',
      'Authorization':tokenConfig(getState).headers['Authorization']
     }
  });
  }
}

//GET LISTS in certain board
export const getLists = (boardId) => {
  return async (dispatch, getState) => {
    console.log("get lists in listsAction.js");
    await axios
      .get('http://127.0.0.1:8000/list_api/lists/'+boardId+'/get-lists/', tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: CONSTANTS.GET_LISTS,
          payload: res.data,
        });
      })
      .catch(err => console.log(err));
  }
};

//GET LISTSORDER
export const getListsOrder = (boardId) => {
  return async (dispatch, getState) => {
  console.log("getListsOrder in listsAction.js")
  await axios
    .get('http://127.0.0.1:8000/list_api/listsOrder/'+boardId+'/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CONSTANTS.GET_LISTSORDER,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
  }
};

//DELETE LIST
export const deleteList = (listID) => {
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  const pk = listID.split("-");
  return async (dispatch, getState) => {
    console.log("delete a List in listsAction.js")
    await axios
      .delete('http://127.0.0.1:8000/list_api/lists/'+pk[1]+'/', tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: CONSTANTS.DELETE_LIST,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
    }
};

//EDIT LIST TITLE
export const editListTitle = (listID, title) => {
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  const pk = listID.split("-");
  console.log(pk[1]);
  return async (dispatch, getState) => {
    console.log("edit List's title in listsAction.js")
    await axios({
        method: 'PATCH',
        url: 'http://127.0.0.1:8000/list_api/lists/'+pk[1]+'/',
        data: {
          title: title,
          type: "title",
        },
        headers: {
          'Content-type':'application/json',
          'Authorization':tokenConfig(getState).headers['Authorization']
         },
        withCredentials: true
      }).then((res) => {
        dispatch({
          type: CONSTANTS.EDIT_LIST_TITLE,
          payload: res.data,
        });
      })
      .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
    }
};