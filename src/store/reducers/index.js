import {combineReducers} from 'redux'
import {user} from "./user.reducer";
import {search} from "./search.reducer";
import {blog} from './blog.reducer';

const appReducer = combineReducers({
    user,
    search,
    blog
});

const rootReducer = (state, action) => {
    if (action.type === 'UNAUTHENTICATED') {
        state = undefined
    }

    return appReducer(state, action)
};

export default rootReducer
