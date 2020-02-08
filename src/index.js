import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import itemsReducer from './store/reducers/items';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	auth: authReducer,
	items: itemsReducer
});
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
