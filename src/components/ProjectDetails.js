import React from 'react'
import { TimelineMax, Power2 } from 'gsap'

class ProjectDetails extends React.Component {

	componentWillReceiveProps = (nextProps) => {
		this.tl.clear()
		this.tl.kill()

		this.tl
			.set(this.wrapper,  {y: 20, autoAlpha: 0})
			.to(this.wrapper, 0.8, {y: 0, autoAlpha: 1, ease: Power2.easeIn})
	}

	componentWillMount() {
		this.tl = new TimelineMax()
	}

	componentDidMount() {
		this.wrapper = this.refs.descriptionWrapper
		this.tl
			.from(this.wrapper, 0.8, {y: 20, autoAlpha: 0, ease: Power2.easeOut})
	}

	render() {
		console.log('project details: ', this.props)
		return (
			<div>
				<div ref='techWrapper' className='project-tech-wrapper'>
					<p>{this.props.currentProjectData.dev}</p>
				</div>
				<div ref='descriptionWrapper' className='project-description-wrapper'>
					<p>{this.props.currentProjectData.description}</p>
				</div>
			</div>
			)
	}
}

export default ProjectDetails