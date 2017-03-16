import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import {ActionCreators} from './actions';
import thunkMiddleware from 'redux-thunk';

let store = createStore(rootReducer, undefined, applyMiddleware(thunkMiddleware));
store.dispatch(ActionCreators.fetchConfig());

ReactDOM.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.getElementById('ui')
);
