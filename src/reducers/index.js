import { combineReducers } from 'redux';
import projectReducer from './projectReducer'
import dataReducer from './dataReducer';

const reducers = combineReducers({
	projectReducer,
	dataReducer
})

export default reducers