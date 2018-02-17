import * as actionTypes from '../actions/actionTypes';
const initialState = {
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_BOOKS:
      return {
        ...state,
        data: action.books
      };
    case actionTypes.CREATE_NEW_BOOK:
      return {
        ...state,
        data: [...state.data, action.book]
      };
    case actionTypes.REMOVE_BOOK:
      return {
        data: state.data.filter((data) => data.id !== action.id)
      };
    default:
      return state;
  }
};
