import React from 'react'
import { TweenMax, TimelineMax } from 'gsap'

class ProjectHeader extends React.Component  {

	componentWillMount = () => {
	    this.tl = new TimelineMax()
	}

	componentDidMount = () => {
		this.enterAnimation()
	}

	enterAnimation = () => {
		// fix this up later
	    this.tl
	      .set(this.refs.projectHeader, {opacity: 0})
    	  .to(this.refs.headerOverlay, .5, {scaleX: 1, ease: 'Power2'})
	      .set(this.refs.projectHeader, {opacity: 1})
	      .to(this.refs.headerOverlay, .5, {scaleX: 0, ease: 'Expo'});
	}

	componentWillReceiveProps = (nextProps) => {
		console.log('project header changed')
		// TweenMax.fromTo(this.refs.projectHeader, 1, {y: 200}, {y: 0, ease: 'Power2'})
		// TweenMax.fromTo(this.refs.headerOverlay, 2, {scaleX: 1, ease: 'Power2'}, {scaleX: 0, ease: 'Power2'})
		this.tl.clear();
	    this.tl.kill();

	    // const x = -direction * 0;

	    this.tl
	      .set(this.refs.projectHeader, {opacity: 0})
    	  .to(this.refs.headerOverlay, .5, {scaleX: 1, ease: 'Power2'})
	      .set(this.refs.projectHeader, {opacity: 1})
	      .to(this.refs.headerOverlay, .5, {scaleX: 0, ease: 'Expo'});
	}

	render() {
		return (
				<div className="project header-wrapper">
					<div ref="headerOverlay" className="header-overlay"></div>
					<h2 ref="projectHeader">{this.props.title}</h2>
				</div>
			)
	}
}

export default ProjectHeader