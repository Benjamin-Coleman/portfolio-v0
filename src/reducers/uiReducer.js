const uiReducer = (state = {
    aboutOpen: false
}, action) => {
    switch (action.type) {
        case "TOGGLE_ABOUT": {
            return {...state, aboutOpen: !state.aboutOpen}
        }
        default: {
            return state
        }
    }
}

export default uiReducer