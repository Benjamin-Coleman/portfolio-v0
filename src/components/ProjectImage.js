import React from 'react'
import { TweenMax } from 'gsap'


export default class ProjectImage extends React.Component {

	componentDidMount = () => {
		this.enterAnimation()
	}

	enterAnimation = () => {
		TweenMax.from(this.refs.projectImage, 1.6, {scale: 1.1, ease: 'Power2'}, 1);
	}

	render() {
		const projectImages = this.props.projects.map((project, index) => <img key={index} className="project project-image" ref="projectImage" src={project.img.url} alt={project.img.url}/>)
		console.log(this.props)
		return (
			<div className="project project-image-wrapper">
				{projectImages}
			</div>
			)
	}
}