import {blogConstants} from '../constants/blog.constants';

export function blog(state = {data: {}, errorBlog: '', isFetchingBlog: false}, action) {
    switch (action.type) {
        case blogConstants.FETCH_BLOG_BY_ID_SUCCESS:
            return {...state, data: action.payload};
        case blogConstants.FETCH_BLOG_BY_ID_FAILURE:
            return {...state, errorBlog: action.payload};
            case blogConstants.IS_FETCHING_BLOG:
            return {...state, isFetchingBlog: action.payload};
        default:
            return state
    }
}
