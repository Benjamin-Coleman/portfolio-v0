export const incrementProject = () => {
	return {
		type: 'NEXT_PROJECT',
		// payload: data
	}
}

export const decrementProject = () => {
	return {
		type: 'PREVIOUS_PROJECT',
		// payload: data
	}
}

export const setProjectIndex = (index) => {
	return {
		type: 'SET_PHOTO_INDEX',
		payload: index
	}
}

export const fetchProjectData = (data) => {
	return {
		type: 'PROJECTS_DATA_FETCHED',
		payload: data
	}
}

export const projectOpen = () => {
	return {
		type: 'PROJECT_OPEN'
	}
}


export const projectClose = () => {
	return {
		type: 'PROJECT_CLOSE'
	}
}