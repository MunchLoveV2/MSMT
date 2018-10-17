import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (username, password, email, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        username: username,
        password: password,
        email: email,
        userId: id
    };
};

export const authLogout = (username, password, email) => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
        username: username,
        password: password,
        email: email
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (username, password, email, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password,
            email: email
        };
        let url = "/signup";
        if (!isSignup) {
            url = "/login";
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response.data);
                localStorage.setItem('token', response.data.password);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('userId', response.data.id);

                if (response.data.username) {
                    dispatch(authSuccess(response.data.username, response.data.password, response.data.email, response.data.id ));
                } else {
                    dispatch(authFail(response.data.message));
                }
                
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            });


    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const username = localStorage.getItem('username');
            const userId = localStorage.getItem('userId')
            dispatch(authSuccess(username, token, null, userId));

        }
    };
};