import React from 'react'
import { TimelineMax, Power2, Expo } from 'gsap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import DelayLink from './DelayLink'
import { animateScroll } from 'react-scroll'
// import { getPositionStart, getPositionEnd } from '../helpers/offset.js'
import ReactPlayer from 'react-player'
import * as actions from '../actions/projectsActions'

class Project extends React.Component {

    componentWillMount() {
        this.tl = new TimelineMax({
            paused: true
        })
    }

    componentDidMount() {
        // Check if route matches, if so change state
        this.props.projects.forEach( (project, i) => {
            if (project.symbol.toLowerCase() === this.props.match.params.title.toLowerCase()) {
                this.props.actions.setProjectIndex(i)
            }
        })
        this.addEventListeners()
        this.props.actions.projectOpen()
        document.querySelector('body').classList.add('scroll')

        this.detailsEl = document.querySelector('.project-details-wrapper')
        this.projectContainer = document.querySelector('.projects-container')
        this.closeProject = document.querySelector('.closeProject')
        this.projectControls = document.querySelectorAll('.project-controls')
        this.projectHeader = document.querySelector('.project-header h1')

        this.tl.clear();
        this.tl.kill();
        
        // this.detailsEl.classList.add('--hidden')
        this.tl
            .to(this.detailsEl, 1, {autoAlpha: 0, ease: Expo.easeOut})
            // this would be better if it was animating transforms instead of size/position
            .to(this.projectContainer, 0.7, {top: 0, left: 0, height: '100%', width: '100%', ease: Expo.easeInOut}, "-=.5")
            .to(this.projectControls, 0.5, {autoAlpha: 0, ease: Power2.easeOut}, "-=.5")
            .from(this.projectHeader, 0.5, {y: 250, ease: Power2.easeOut}, "-=.5")
            .from(this.closeProject, 0.5, {autoAlpha: 0, ease: Power2.easeIn})
        this.tl.play(0)
    }

    onEscapeKey = e => {
        if (e.keyCode === 27) {
            this.tl.reverse()
            this.props.actions.projectClose()
            setTimeout(() => this.props.history.push("/"), 1000)
        }
    }

    addEventListeners = () => {
        document.addEventListener('keyup', this.onEscapeKey, false);
    }

    componentWillUnmount() {
        this.closeProjectAnimation()
    }

    closeProjectAnimation = () => {
        animateScroll.scrollToTop({duration: 300, smooth: true})
        this.tl.reverse()
        this.props.actions.projectClose()
    }

    goPrevProject = () => {
        const splashScreen = document.querySelector('.splash-screen')
        splashScreen.classList.remove('--is-hidden')
        const readyNext = () => {
            window.scroll(0, 0)
            this.props.actions.decrementProject()
        }
        const tl = new TimelineMax()
            .to(splashScreen, 1, { opacity: 1, ease: 'Power2', onComplete: readyNext })
            .to(splashScreen, 1, { opacity: 0, ease: 'Power2', onComplete: () => splashScreen.classList.add('--is-hidden') })
    }

    goNextProject = () => {
        const splashScreen = document.querySelector('.splash-screen')
        splashScreen.classList.remove('--is-hidden')
        const readyNext = () => {
            window.scroll(0, 0)
            this.props.actions.incrementProject()
        }
        const tl = new TimelineMax()
            .to(splashScreen, 1, { opacity: 1, ease: 'Power2', onComplete: readyNext })
            .to(splashScreen, 1, { opacity: 0, ease: 'Power2', onComplete: () => splashScreen.classList.add('--is-hidden') })
    }

    render() {
        const projectInfo = this.props.currentProject.data.map((section, i) => (
            <section className='project-section' key={i}>
            <p className='project-section-text'>
                {section.description}
            </p>
            <ReactPlayer
                key={i}
                className='video-player'
                url={section.video}
                playing={true}
                preload={true}
                loop={true}
                muted={true}
                width={'100%'}
                height={'auto'}
                playsinline={true}
            />
            </section>
        ))

        const prevProject = this.props.currentIndex > 0 ? this.props.projects[this.props.currentIndex - 1] : this.props.projects[this.props.projects.length - 1]
        const nextProject = this.props.currentIndex >= this.props.projects.length - 1 ? this.props.projects[0] : this.props.projects[this.props.currentIndex + 1]

        return (
            <div>
                <DelayLink to='/' delay={1000} onDelayStart={ this.closeProjectAnimation }>
                    <div className='closeProject'>
                        <p>X</p>
                    </div>
                </DelayLink>
                <div className='scroll-prompt'>
                    <p>Scroll</p>
                    <p className='arrow'>←</p>
                </div>
                <div className='project-header'>
                    <h1>{this.props.currentProject.symbol}</h1>
                </div>
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
                <div className="project-story-wrapper">
                    { projectInfo }
                </div>
                <div className="project-story-end">
                    <Link to={`/projects/${prevProject.symbol}`}>
                        <div className="project-prev" style={{ backgroundImage: `url(${prevProject.img.url})` }} onClick={this.goPrevProject}>
                            <h3>Previous Project</h3>
                        </div>
                    </Link>
                    <Link to={`/projects/${nextProject.symbol}`}>
                        <div className="project-next" style={{ backgroundImage: `url(${nextProject.img.url})` }} onClick={this.goNextProject}>
                            <h3>Next Project</h3>
                        </div>
                    </Link>
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