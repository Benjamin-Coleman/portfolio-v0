import React from 'react'
import { TweenMax } from 'gsap'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import * as actions from '../actions/index'


class Header extends React.Component {

	headerEnterAnimation() {
		TweenMax.fromTo(this.refs.header, 1.5, {y: -15, opacity: 0}, {y: 0, opacity: 1, ease: 'Power2'})
	}

	componentDidMount() {
		this.headerEnterAnimation()
	}

	// handleAbout = () => {
	// 	this.props.actions.toggleAbout()
	// 	TweenMax
	// }

	render() {
		return (
			<div>
				<div ref="header" className="header"><p>Portfolio V0</p></div>
			</div>
			)
	}

}

export default Header

// const mapStateToProps = state => ({
// 	aboutOpen: state.uiReducer.aboutOpen
// })

// const mapDispatchToProps = dispatch => ({
// 	actions: bindActionCreators(actions, dispatch)
// })

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps)(Header)