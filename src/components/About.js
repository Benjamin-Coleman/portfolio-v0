import React from 'react'
import { TimelineMax, Power4 } from 'gsap'

class About extends React.Component {

    state = {
        isOpen: false
    }

    componentDidMount() {
        this.wrapper = this.refs.aboutWrapper
        this.content = this.refs.aboutContent
        // add esc event listeners
        this.addEventListeners()
        this.generateTimeline()
    }

    openPanel = () => {
        if (!this.state.isOpen) {
            this.setState({ isOpen: true })
            this.wrapper.classList.add('about-wrapper-active')
            this.tl.play(0)
            // maybe add a redux action here
        }
    }

    closePanel = () => {
        if (this.state.isOpen) {
            this.setState({ isOpen: false })
            this.wrapper.classList.add('about-wrapper-active')
            this.tl.reverse()
        }
    }

    onEscapeKey = e => {
        if (e.keyCode === 27) {
            this.closePanel()
        }
    }

    addEventListeners = () => {
        document.addEventListener('keyup', this.onEscapeKey, false);
    }

    generateTimeline() {

        this.tl = new TimelineMax({
            paused: true,
            onReverseComplete: () => {
                this.wrapper.classList.remove('about-wrapper-active');
            }
        });

        this.tl
            .to(this.content, 1, { x: '0%', ease: Power4.easeOut })
            // .to(this.appWrapper, 1, { x: -200, ease: Power4.easeOut }, 0)
            // .to(this.overlay, 0.5, { opacity: 1 }, 0.2);

    }

    render() {
        console.log(this)
        return (
            <div>
                <div ref="aboutText" className="about-text" onClick={this.openPanel}><p>About</p></div>
                <div className="about-wrapper" ref="aboutWrapper" onClick={this.closePanel}>
                    <div className="about-content" ref="aboutContent">
                        <span className="about-close" onClick={this.closePanel}>
                            X
                        </span>
                        <h2>About</h2>
                        <p>Hi, I'm Ben. I'm a fullstack developer with a love for creative design, coffee and basketball. Currently in Brooklyn, NY looking for an opportunity making things.</p>
                        <h4>Get in touch</h4>
                        <p>
                            <a href="mailto:hello@benjamincoleman.me" rel="noopener noreferrer" target="_blank">Mail</a> / <a href="https://github.com/Benjamin-Coleman" rel="noopener noreferrer" target="_blank">Github</a> / <a href="https://medium.com/@benjamin.c.coleman/" rel="noopener noreferrer" target="_blank">Medium</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default About