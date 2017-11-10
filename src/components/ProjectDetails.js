import React from 'react'
import { TweenMax } from 'gsap'

class ProjectDetails extends React.Component {

	componentWillReceiveProps = (nextProps) => {
		console.log('new details')
	}

	render() {
		console.log('project details: ', this.props)
		return (
			<div>
				<p>{this.props.currentProjectData.description}</p>
			</div>
			)
	}
}

export default ProjectDetails