import {searchConstants} from '../constants/search.constants';

export const searchActions = {
    searchByKeyword
};

function searchByKeyword(keyword) {
    return dispatch => {
        console.log('search performed for keyword', keyword);
        /// provide service for fetching data
        if (keyword.length) {
            dispatch(success(['hello']));
        } else {
            dispatch(failure('keyword is not a valid string'));
        }


        function success(data) {
            return {type: searchConstants.SEARCH_DATA_SUCCESS, payload: data}
        }

        function failure(error) {
            return {type: searchConstants.SEARCH_DATA_FAILURE, payload: error}
        }
    }
}
