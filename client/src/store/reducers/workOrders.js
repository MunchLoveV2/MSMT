import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  workOrders: null
};

const getWorkOrders = (state, action) => {
  return updateObject(state, {
    workOrders: action.workOrders
    //error: false
  });
};

const updateWorkOrders = (state, action) => {
  return updateObject(state, {
    workOrders: action.workOrders
    //error: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WORK_ORDERS:
      return getWorkOrders(state, action);
    case actionTypes.UPDATE_WORK_ORDERS:
      return updateWorkOrders(state, action);
    default:
      return state;
  }
};

export default reducer;
