import {blogConstants} from '../constants/blog.constants';

export const blogActions = {
    getBlogByID,
    updateBlog,
};

function getBlogByID(id) {
    return dispatch => {
        dispatch(isFetching(true));
        setTimeout(() => {
            dispatch(isFetching(false));
            dispatch(success({title: 'hello world', description: 'lorem ipsum', currencyType: 'BTC'}));
        },2000);


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

function updateBlog(values) {
    return dispatch => {
            dispatch(success(values));
            setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 3000);

        function success(data) {
            return {type: blogConstants.UPDATE_BLOG_SUCCESS, payload: data}
        }

        function clearSuccessMessage() {
            return {type: blogConstants.UPDATE_SUCCESS_BLOG_MESSAGE, payload: ''}
        }

        function failure(error) {
            return {type: blogConstants.UPDATE_BLOG_FAILURE, payload: error}
        }

        function isFetching(boolean) {
            return {type: blogConstants.IS_FETCHING_BLOG, payload: boolean}
        }
    }
}

