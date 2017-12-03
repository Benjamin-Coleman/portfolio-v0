export const toggleAbout = () => {
    return {
        type: 'TOGGLE_ABOUT'
    }
}

export const screenResize = (viewport) => {
    return {
        type: 'SCREEN_RESIZE',
        viewport
    }
}
