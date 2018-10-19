import { updateObject } from '../utility';

const initialState = {
    workOrders: null
}

const reducer = (state, action) => {
    return updateObject( state, {
        workOrders: action.workOrders
        //error: false
    } );
};

export default reducer;