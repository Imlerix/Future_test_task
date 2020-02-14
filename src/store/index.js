import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);

export const initStore = (initialState = {}) => {
    return createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            // composeWithDevTools(),
        )
    )
}
