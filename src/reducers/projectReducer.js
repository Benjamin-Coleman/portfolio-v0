 const projectReducer = (state={
    currentIndex: 0,
    projects: [],
    projectOpen: false
  }, action) => {
    switch (action.type) {
      case "SET_PHOTO_INDEX": {
        return {...state, currentIndex: action.payload}
      }
      // case "WORK_DATA_FETCHED": {
      //   return {...state, projectsData: action.payload.projects}
      // }
      case "INCREMENT_PHOTO_INDEX": {        
        const currentIndex = (state.currentIndex < state.projects.length - 1 ) ? state.currentIndex + 1 : 0;
        return {...state, currentIndex: currentIndex}
      }
      case "DECREMENT_PHOTO_INDEX": {
        return {...state, currentIndex: state.currentIndex - 1}
      }
      case "PROJECTS_DATA_FETCHED": {
        return {...state, projects: action.payload.projects}
      }
      case "NEXT_PROJECT": {
        const currentIndex = (state.currentIndex < state.projects.length - 1 ) ? state.currentIndex + 1 : 0;
        return {...state, currentIndex: currentIndex}
      }
      case "PREVIOUS_PROJECT": {
        const currentIndex = (state.currentIndex > 0 ) ? state.currentIndex - 1 : state.projects.length - 1;
        return {...state, currentIndex: currentIndex}
      }
      case "PROJECT_OPEN": {
        return { ...state, projectOpen: true }
      }
      case "PROJECT_CLOSE": {
        return { ...state, projectOpen: false }
      }
      default: {
        return state
      }
    }

}

export default projectReducer