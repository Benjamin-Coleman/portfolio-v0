import React from 'react'
import { TimelineMax, Power2 } from 'gsap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Project extends React.Component {

    componentWillMount() {
        this.tl = new TimelineMax({
            paused: true
        })
    }

    componentDidMount() {
        this.detailsEl = document.querySelector('.project-details-wrapper')
        this.projectContainer = document.querySelector('.projects-container')
        this.closeProject = document.querySelector('.closeProject')
        this.projectControls = document.querySelectorAll('.project-controls')

        this.tl.clear();
        this.tl.kill();
        
        // this.detailsEl.classList.add('--hidden')
        this.tl
            .to(this.detailsEl, 1, {autoAlpha: 0, ease: Power2.easeOut})
            // this would be better if it was animating transforms instead of size/position
            .to(this.projectContainer, 0.7, {top: 0, left: 0, height: '100%', width: '100%', ease: Power2.easeOut})
            .to(this.projectControls, 0.5, {autoAlpha: 0, ease: Power2.easeOut}, "-=.5")
            .from(this.closeProject, 0.5, {autoAlpha: 0, ease: Power2.easeIn})
        this.tl.play(0)
    }

    componentWillUnmount() {
        this.tl.reverse()
    }

    render() {
        return (
            <div>
                <Link to='/'>
                    <div className='closeProject'>
                        <p>X</p>
                    </div>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentIndex: state.projectReducer.currentIndex,
    projects: state.projectReducer.projects,
    currentProject: state.projectReducer.projects[state.projectReducer.currentIndex]
})

export default connect(mapStateToProps)(Project)