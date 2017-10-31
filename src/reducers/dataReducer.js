const dataReducer  = (state = {
	projectsData: {}
}, action) => {
	switch (action.type) {
		case "WORK_DATA_FETCHED": {
			return {...state, projectsData: action.payload.projects}
		}
		default: {
			return state
		}
	}
}

export default dataReducer