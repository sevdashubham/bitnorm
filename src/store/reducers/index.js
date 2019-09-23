import {combineReducers} from 'redux'
import {user} from "./user.reducer";

const appReducer = combineReducers({
    user,
});

const rootReducer = (state, action) => {
    if (action.type === 'UNAUTHENTICATED') {
        state = undefined
    }

    return appReducer(state, action)
};

export default rootReducer
