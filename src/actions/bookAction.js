import {fetchBooks, createBook, deleteBook} from '../api/Api';

export const fetchBooksWhenNeeded = () => dispatch => {
  return dispatch(fetchBooks());
};

export const createBookWhenNeeded = (content)=> dispatch => {
  return dispatch(createBook(content))
};

export const deleteBookWhenNeeded = (ID) => dispatch => {
  return dispatch(deleteBook(ID))
};
