import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route path="/" component={App} />
		</Router>
	</Provider>, 
	document.getElementById('root'));
registerServiceWorker();
