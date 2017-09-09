import React from 'react'
import data from './projects.json'
import { TweenMax, TimelineMax } from 'gsap'
import ProjectImage from './ProjectImage'
import ProjectControls from './ProjectControls'
import ProjectHeader from './ProjectHeader'

export default class ProjectContainer extends React.Component {

	state = {
		currentProject: data.projects[0],
		currentProjectIndex: 0,
		projects: data.projects,
	}

	componentWillMount = () => {
	    this.tl = new TimelineMax()
	    this.canScroll = true
	}

	componentDidMount = () => {
		this.addListerners()
		this.visualEls = document.getElementsByClassName('project project-image');

    	this.visualEls[0].classList.add('--is-active')
	}

	addListerners = () => {
    	document.addEventListener('keyup', this.onKeyUp, false)
    	document.addEventListener('wheel', this.onWheel, false)
	}

	onKeyUp = (ev) => {
		if(ev.keyCode === 39 || ev.keyCode === 40 ) {
		  this.nextProject();
		} else if (ev.keyCode === 37 || ev.keyCode === 38) {
		  this.previousProject();
		}
	} 

	onWheel = (ev) => {
		ev.preventDefault()
		if (ev.deltaY > 50 && this.canScroll){
			this.canScroll = false

			setTimeout(() => this.canScroll = true, 800)

			this.nextProject()
		}
		else if (ev.deltaY < -50 && this.canScroll){
			this.canScroll = false

			setTimeout(() => this.canScroll = true, 800)

			this.previousProject()
		}
	}

	nextProject = () => {
		console.log('going to next project')

		const nextProjectIndex = this.state.currentProjectIndex === this.state.projects.length - 1 ? 0 : this.state.currentProjectIndex + 1
		// const nextProject = data.projects[this.state.currentProjectIndex + 1]
		this.setState({currentProject: data.projects[nextProjectIndex], currentProjectIndex: nextProjectIndex})

		const visualActive = this.visualEls[nextProjectIndex];

	    for (let i = 0; i < this.visualEls.length; i++) {
	      this.visualEls[i].classList.remove('--is-active');
	    }

	    visualActive.classList.add('--is-active');

	    // TweenMax.fromTo(visualActive, 1, {y: 50, opacity: 0, scale: 1.1}, {opacity: 1, y: 0, scale: 1, ease: "Power2"})

	this.tl.clear();
    this.tl.kill();

    // const x = -direction * 0;

    this.tl
      .fromTo(visualActive, 2, {scale: 1.08, x: '0' + '%'}, {scale: 1, x: "0%", ease: 'Expo'});
	}

	previousProject = () => {
		console.log('going to previous project')

		// const previousProject = data.projects[this.state.currentProjectIndex - 1]
		const previousProjectIndex = this.state.currentProjectIndex === 0 ? this.state.projects.length - 1 : this.state.currentProjectIndex - 1
		this.setState({currentProject: data.projects[previousProjectIndex], currentProjectIndex: previousProjectIndex})

		const visualActive = this.visualEls[previousProjectIndex];

	    for (let i = 0; i < this.visualEls.length; i++) {
	      this.visualEls[i].classList.remove('--is-active');
	    }

	    visualActive.classList.add('--is-active');

	    // TweenMax.fromTo(visualActive, 1, {y: 50, opacity: 0, scale: 1.1}, {opacity: 1, y: 0, scale: 1, ease: "Power2"})

		this.tl.clear();
	    this.tl.kill();

	    // const x = -direction * 0;

	    this.tl
	      .fromTo(visualActive, 2, {scale: 1.08, x: '0' + '%'}, {scale: 1, x: "0%", ease: 'Expo'});
	}

	changeProject(direction) {
		//don't use this yet, should refactor so previous/next project just use a direction
	}

	render() {
		return (
			<div className="projects-container">

				<ProjectImage currentProject={this.state.currentProject} projects={this.state.projects} />
				<ProjectControls currentProject={this.state.currentProject} nextProject={this.nextProject} previousProject={this.previousProject} />
				<ProjectHeader title={this.state.currentProject.symbol} />
			</div>
			)
	}
}