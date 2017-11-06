import { combineReducers } from 'redux';
import projectReducer from './projectReducer'
import dataReducer from './dataReducer';
import uiReducer from './uiReducer';

const reducers = combineReducers({
	projectReducer,
	dataReducer,
	uiReducer
})

export default reducers