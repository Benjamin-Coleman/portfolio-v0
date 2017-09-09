import React from 'react'
import { TweenMax } from 'gsap'


export default class Header extends React.Component {

	headerEnterAnimation() {
		TweenMax.fromTo(this.refs.header, 1.5, {y: -15, opacity: 0}, {y: 0, opacity: 1, ease: 'Power2'})
	}

	componentDidMount() {
		this.headerEnterAnimation()
	}

	render() {
		return (
			<div ref="header" className="header"><p>Portfolio V0</p></div>
			)
	}

}