import {userConstants} from '../constants/user.constants';

export function user(state = {data: {}, authenticated: false}, action) {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {...state, authenticated: true, data: action.payload};
        case userConstants.LOGIN_FAILURE:
            return {...state, authenticated: false};
        case userConstants.IS_AUTHENTICATED:
            return {...state, authenticated: action.payload};
        case userConstants.SET_USER_DATA:
            return {...state, data: action.payload.data};
        case userConstants.UPDATE_USER_EMAIL:
            return {...state, data: {...state.data, email: action.payload}};
        case userConstants.AUTHENTICATED:
            return {...state, authenticated: true};
        case userConstants.UNAUTHENTICATED:
            return {...state, authenticated: false};
        case userConstants.LOGOUT:
            return {data: {}, authenticated: false};
        default:
            return state
    }
};
