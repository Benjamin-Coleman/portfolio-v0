import React from 'react'

const ProjectControls = (props) => {
	const handleNext = () => {
		props.nextProject()
	}

	const handlePrevious = () => {
		props.previousProject()
	}

	return (
		<div className='project-controls-wrapper'>
			<div className='project-controls next' onClick={handlePrevious}>{'<'}</div>
			<div className='project-controls previous' onClick={handleNext}>{'>'}</div>
		</div>
		)
}

export default ProjectControls