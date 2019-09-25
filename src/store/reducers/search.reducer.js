import {searchConstants} from '../constants/search.constants';

export function search(state = {data: [], errorSearch: ''}, action) {
    switch (action.type) {
        case searchConstants.SEARCH_DATA_SUCCESS:
            return {...state, data: action.payload};
        case searchConstants.SEARCH_DATA_FAILURE:
            return {...state, errorSearch: action.payload};
        default:
            return state
    }
};
