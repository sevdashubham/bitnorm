import {blogConstants} from '../constants/blog.constants';

export function blog(state = {data: {}, errorBlog: '', isFetchingBlog: false, successMessageBlog: ''}, action) {
    switch (action.type) {
        case blogConstants.FETCH_BLOG_BY_ID_SUCCESS:
            return {...state, data: action.payload};
        case blogConstants.FETCH_BLOG_BY_ID_FAILURE:
            return {...state, errorBlog: action.payload};
        case blogConstants.UPDATE_BLOG_SUCCESS:
            return {...state, data: {title: action.payload.title, description: action.payload.description, currencyType: action.payload.currencyType}, successMessageBlog: 'Updated successfully'};
        case blogConstants.UPDATE_BLOG_FAILURE:
            return {...state, errorBlog: action.payload};
        case blogConstants.IS_FETCHING_BLOG:
            return {...state, isFetchingBlog: action.payload};
            case blogConstants.UPDATE_SUCCESS_BLOG_MESSAGE:
            return {...state, successMessageBlog: action.payload};
        default:
            return state
    }
}
