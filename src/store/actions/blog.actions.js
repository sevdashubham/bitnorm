import {blogConstants} from '../constants/blog.constants';

export const blogActions = {
    getBlogByID
};

function getBlogByID(id) {
    return dispatch => {
            dispatch(success({name: 'hello world', description: 'lorem ipsum'}));

        function success(data) {
            return {type: blogConstants.FETCH_BLOG_BY_ID_SUCCESS, payload: data}
        }

        function failure(error) {
            return {type: blogConstants.FETCH_BLOG_BY_ID_FAILURE, payload: error}
        }

        function isFetching(boolean) {
            return {type: blogConstants.IS_FETCHING_BLOG, payload: boolean}
        }
    }
}

