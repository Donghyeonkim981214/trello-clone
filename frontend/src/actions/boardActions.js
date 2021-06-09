import { CONSTANTS } from "../actions";
import { createMessage, returnErrors } from './messages';
import axios from 'axios';
import { tokenConfig } from './auth';

// GET BOARDSLIST
export const getBoardsList = () => {
  return async (dispatch, getState) => {
    console.log("get Boards List in boardsAction.js");
    await axios
      .get(`/board_api/boards`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: CONSTANTS.GET_BOARDSLIST,
          payload: res.data,
        });
      })
      .catch(err => console.log(err));
  }
};

// GET BOARDSORDER
export const getBoardsOrder = () => {
  return async (dispatch, getState) => {
  console.log("getBoardsOrder in boardAction.js")
  await axios
    .get(`/board_api/boardsOrder`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CONSTANTS.GET_BOARDSORDER,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
  }
};

//ADD BOARD
export const addBoard = (title) => {
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  return async (dispatch, getState) => {
  await axios({
    method: 'post',
    url: '/board_api/boards/',
    data: {
      title: title,
      id: "",
    },
    headers: {
      'Content-type':'application/json',
      'Authorization':tokenConfig(getState).headers['Authorization']
     }
  }).then((res) => {
      dispatch(createMessage({ addBoard: 'Board Added' }));
      dispatch({
        type: CONSTANTS.ADD_BOARD,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
  };
}

//DELETE BOARD
export const deleteBoard = (boardid) => {
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  const pk = boardid.split("-");
  return async (dispatch, getState) => {
  console.log("delete a Board in boardAction.js")
  await axios
      .delete('/board_api/boards/'+pk[1]+'/', tokenConfig(getState))
      .then((res) => {
        dispatch(createMessage({ deleteBoard: 'Board Deleted' }));
        dispatch({
          type: CONSTANTS.DELETE_BOARD,
          payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
  };
}

//GET BOARD
export const getBoard = (boardID) => {
  console.log(boardID)
  return async (dispatch, getState) => {
  await axios
    .get('/board_api/boards/'+boardID+'/get-board/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CONSTANTS.GET_BOARD,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
  }
};
