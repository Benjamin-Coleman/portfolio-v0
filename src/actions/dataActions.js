export const fetchProjectData = (data) => {
	return {
		type: 'PROJECTS_DATA_FETCHED',
		payload: data
	}
}