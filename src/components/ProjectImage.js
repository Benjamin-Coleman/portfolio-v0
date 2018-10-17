import React from 'react'
import { TweenMax } from 'gsap'
import { connect } from 'react-redux'


class ProjectImage extends React.Component {

	state = {
		active: false
	}

	componentDidMount = () => {
		this.enterAnimation()
	}

	// componentWillMount = () => {
	//     this.tl = new TimelineMax()
	// }

	componentWillReceiveProps = (nextProps) => {
		// let activeImage = document.querySelector('.--is-active')
	// this.tl.clear();
 //    this.tl.kill();

 //    // const x = -direction * 0;

 //    this.tl
 //      .fromTo(activeImage, 2, {scale: 1.08, x: '0' + '%'}, {scale: 1, x: "0%", ease: 'Expo'});
	}

	enterAnimation = () => {
		TweenMax.from(this.refs.projectImage, 1.6, {scale: 1.1, ease: 'Power2'}, 1);
	}

	render() {
		const projectImages = this.props.projects.map((project, index) => <img key={index} className={index === this.props.currentIndex ? "project project-image --is-active" : "project project-image"} ref="projectImage" src={project.img.url} alt={project.img.url}/>)
		return (
			<div className="project project-image-wrapper">
				{projectImages}
			</div>
			)
	}
}

const mapStateToProps = state => ({
	projects: state.projectReducer.projects,
	currentIndex: state.projectReducer.currentIndex
})

export default connect(mapStateToProps)(ProjectImage)