import * as ActionTypes from './ActionTypes';

export const Receipts = (state = { errMess: null, comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_RECEIPTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.ADD_RECEIPTS_FAILED:
      return {...state, errMess: action.payload};

    default:
      return state;
  }
};