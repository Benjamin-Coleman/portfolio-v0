const uiReducer = (state = {
    aboutOpen: false,
    height: null,
    width: null
}, action) => {
    switch (action.type) {
        case "TOGGLE_ABOUT": {
            return {...state, aboutOpen: !state.aboutOpen}
        }
        case 'SCREEN_RESIZE':
            return Object.assign({}, state, {
                width: action.viewport.width,
                height: action.viewport.height
            });
        default: {
            return state
        }
    }
}

export default uiReducer