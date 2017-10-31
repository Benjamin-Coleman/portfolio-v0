import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/projectsActions'

const ProjectControls = (props) => {

	const handleNext = () => {
		props.actions.incrementProject()
	}

	const handlePrevious = () => {
		props.actions.decrementProject()
	}

	return (
		<div className='project-controls-wrapper'>
			<div className='project-controls next' onClick={handlePrevious}>{'<'}</div>
			<div className='project-controls previous' onClick={handleNext}>{'>'}</div>
		</div>
		)
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(null, mapDispatchToProps)(ProjectControls)