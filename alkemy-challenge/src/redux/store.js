import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../redux/reducers';

const rootReducer = combineReducers({
    superheroes : reducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunk) ))
    return store;
}
