import {userConstants} from '../constants/user.constants';

export const userActions = {
    login,
    logout,
    isAuthenticated
};

function login(email, password) {
    return dispatch => {
        localStorage.setItem('bitNormToken', '1');
        dispatch(success());

        function success() {
            return {type: userConstants.LOGIN_SUCCESS, payload: ''}
        }
    }
}

function isAuthenticated(boolean) {
    return dispatch => {
        dispatch({type: userConstants.LOGGED_IN, payload: boolean})
    }
}


function logout() {
    return dispatch => {
        localStorage.clear();
        dispatch({type: userConstants.IS_AUTHENTICATED, payload: false})
    }
}
