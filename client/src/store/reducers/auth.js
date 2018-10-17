import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    username: null,
    userId: null,
    password: null,
    email: null,
    loading: false
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authLogout = ( state, action ) => {
    return updateObject( state, { username: null, password: null, userId: null } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        username: action.username,
        password: action.password,
        userId: action.userId,
        email: action.email,
        error: null,
        loading: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
};

export default reducer;