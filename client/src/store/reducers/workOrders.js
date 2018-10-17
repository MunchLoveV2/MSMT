import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../utility';

const initialState = {
    workOrders: []
}

const getWorkOrders = (state, action) => {
    return updateObject( state, {
        workOrders: action.workOrders
        //error: false
    } );
};