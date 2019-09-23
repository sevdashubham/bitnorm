import {userConstants} from '../constants/user.constants';

export const userActions = {
    login,
    register,
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

        function failure(error) {
            return {type: userConstants.LOGIN_FAILURE, payload: error}
        }
    }
}

function register(values, setStatus, setSubmitting, setErrors, shoppingBagID, history) {
    return dispatch => {


        function LoginSuccess(user) {
            return {type: userConstants.LOGIN_SUCCESS, payload: user}
        }

        function success(user) {
            return {type: userConstants.REGISTER_SUCCESS, payload: user}
        }

        function failure(error) {
            return {type: userConstants.REGISTER_FAILURE, payload: error}
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