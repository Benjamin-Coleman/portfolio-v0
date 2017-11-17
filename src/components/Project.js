import React from 'react'
import { TimelineMax, Power2 } from 'gsap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions/projectsActions'

class Project extends React.Component {

    componentWillMount() {
        this.tl = new TimelineMax({
            paused: true
        })
    }

    componentDidMount() {
        this.props.actions.projectOpen()
        document.querySelector('body').classList.add('scroll')

        this.detailsEl = document.querySelector('.project-details-wrapper')
        this.projectContainer = document.querySelector('.projects-container')
        this.closeProject = document.querySelector('.closeProject')
        this.projectControls = document.querySelectorAll('.project-controls')

        this.tl.clear();
        this.tl.kill();
        
        // this.detailsEl.classList.add('--hidden')
        this.tl
            .to(this.detailsEl, 1, {autoAlpha: 0,vease: Power2.easeOut})
            // this would be better if it was animating transforms instead of size/position
            .to(this.projectContainer, 0.7, {top: 0, left: 0, height: '100%', width: '100%', ease: Power2.easeOut})
            .to(this.projectControls, 0.5, {autoAlpha: 0, ease: Power2.easeOut}, "-=.5")
            .from(this.closeProject, 0.5, {autoAlpha: 0, ease: Power2.easeIn})
        this.tl.play(0)
    }

    componentWillUnmount() {
        this.tl.reverse()
        this.props.actions.projectClose()
    }

    render() {
        return (
            <div>
                <Link to='/'>
                    <div className='closeProject'>
                        <p>X</p>
                    </div>
                </Link>
                <div className='project-info-wrapper'>
                    <div className='project-title-wrapper'>
                        <span className='category'>Title</span>
                        <h2>{this.props.currentProject.symbol}</h2>
                        <span className='category'>Role</span>
                        <h3>Developer, Designer</h3>
                        <span className='category'>Dev Stack</span>
                        <h3>{this.props.currentProject.dev}</h3>
                    </div>
                    <div className='project-overview-wrapper'>
                        <span className='category'>See it</span>
                        {this.props.currentProject.link.url !== '' ? <a href={this.props.currentProject.link.url} target='blank'>{this.props.currentProject.link.label}</a> : null }
                        {this.props.currentProject.link.github !== '' ? <a href={this.props.currentProject.link.github} target='blank'>Github</a> : null }
                        <span className='category'>Description</span>
                        <p>{this.props.currentProject.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentIndex: state.projectReducer.currentIndex,
    projects: state.projectReducer.projects,
    currentProject: state.projectReducer.projects[state.projectReducer.currentIndex]
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Project)