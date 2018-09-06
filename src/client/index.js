import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
// import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux'

import gameSession from '../reducers/gameSession'
// Todo: either rename file, or split reducers into multiple files

// import { mixCards } from './actions';

import { Provider } from 'react-redux'

let store = createStore(gameSession);
// store.dispatch(mixCards());
// store.dispatch();

const root = document.querySelector('#root');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , root
);
// registerServiceWorker();
