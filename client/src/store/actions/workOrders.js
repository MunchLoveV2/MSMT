import * as actionTypes from "./actionTypes";
import axios from "axios"; 


export const getWorkOrders = (workOrders) => {
    return {
        type: actionTypes.GET_WORK_ORDERS,
        workOrders: workOrders
    }
}


export const renderWorkOrders = (query) => {
    return dispatch => {
        axios.get(query)
        .then(response => {
            dispatch(getWorkOrders(response.data));
        })
/*         .catch(error => {
            dispatch(fetchBusinessesFailed());
        }) */
    }
}