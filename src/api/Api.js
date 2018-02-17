import * as actionTypes from '../actions/actionTypes';

export const fetchBooks = () => dispatch => {
  return fetch('/api/book', {method: 'GET'})
    .then(response => Promise.all([response, response.json()]))
    .then(([res, json]) => {
      if (res.status === 200) {
        dispatch(fetchBooksSuccess(actionTypes.GET_ALL_BOOKS,json))
      } else {
        dispatch(fetchBooksError(actionTypes.GET_ALL_BOOKS))
      }
    })
};

export const createBook = (content) => dispatch =>{
  return fetch('/api/book', {method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content)})
    .then(response => Promise.all([response, response.json()]))
    .then(([res, json]) => {
      if (res.status === 200) {
        dispatch(createBookSuccess(actionTypes.CREATE_NEW_BOOK, json))
      } else {
        dispatch(createBookError(actionTypes.CREATE_NEW_BOOK))
      }
    })
};

export const deleteBook = (ID) => dispatch =>{
  return fetch('/api/book/'+ID, {method:'DELETE'})
    .then(response => Promise.all([response, response.json()]))
    .then(([res, json]) => {
      if (res.status === 200) {
        dispatch(deleteBookSuccess(actionTypes.REMOVE_BOOK, ID))
      } else {
        dispatch(deleteBookError(actionTypes.REMOVE_BOOK))
      }
    })
};

function fetchBooksSuccess(type, response) {
  return {
    type: type,
    books: response
  }
}
function createBookSuccess(type, response) {
  return {
    type: type,
    book: response.result
  }
}
function deleteBookSuccess(type, response) {
  return {
    type: type,
    id: response
  }
}

function createBookError(type) {
  return {
    type: type,
    book: []
  }
}


function fetchBooksError(type) {
  return {
    type: type,
    books: []
  }
}

function deleteBookError(type) {
  return {
    type: type,
    id: -1
  }
}
