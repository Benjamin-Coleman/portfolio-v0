import React from 'react'
import { TimelineMax, TweenMax } from 'gsap'

export default class SplashScreen extends React.Component {

	fadeOutAnimation = () => {
		TweenMax.to(this.refs.splashScreen, 1.5, {opacity: 0, ease: 'Power2', onComplete: () => this.refs.splashScreen.classList.add('--is-hidden')})
	}

	slideInAnimation = () => {
		this.tl
			.to(this.refs.splashScreen, 1.2, {x: '-100%'})
	}

	componentDidMount() {
		this.tl = new TimelineMax()
		// this.tl.add(this.slideInAnimation)
		this.tl.add(this.fadeOutAnimation)
		// this.fadeOutAnimation()
	}

	render() {
		return (
			<div className="splash-screen" ref="splashScreen">
				<div>
					<h2></h2>
				</div>
			</div>
			)
	}
}