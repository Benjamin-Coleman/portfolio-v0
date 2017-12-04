import React from 'react'
import { connect } from 'react-redux'
import { TimelineMax, Power4 } from 'gsap'

class Counter extends React.Component {

    componentWillMount() {
        this.tl = new TimelineMax()
    }

    componentDidMount() {
        this.counter = this.refs.counter
        this.projectNumber = this.refs.projectNumber
        this.offsetTop = 8

        this.tl.clear()
        this.tl.kill()

        this.tl
            //.set(this.counter, {autoAlpha: 0, y: 20})
            .set(this.projectNumber, {y: this.offsetTop})
            .to(this.counter, 1.5, {autoAlpha: 1, y:0})
    }

    componentWillReceiveProps(nextProps) {
        // probably turn this into a switch statement
        let offsetTop = `${this.offsetTop - (nextProps.currentIndex * 36)}px`

        if (nextProps.currentIndex === this.props.currentIndex + 1) {
            this.tl.clear()
            this.tl.kill()

            this.tl
                .to(this.refs.projectNumber, 0.5, {y: offsetTop, ease: Power4.easeOut})
        }
        else if (nextProps.currentIndex === this.props.currentIndex - 1) {
            this.tl.clear()
            this.tl.kill()

            this.tl
                .to(this.refs.projectNumber, 0.5, { y: offsetTop, ease: Power4.easeOut })
        }
        else if (nextProps.currentIndex === 0) {
            this.tl.clear()
            this.tl.kill()

            this.tl
                .to(this.refs.projectNumber, 0.5, {y: this.offsetTop, ease: Power4.easeOut})
        }
        else if (nextProps.currentIndex === this.props.projects.length - 1) {
            this.tl.clear()
            this.tl.kill()

            this.tl
                .to(this.refs.projectNumber, 0.5, {y: offsetTop, ease: Power4.easeOut})
        }
    }

    render() {
        const numbers = this.props.projects.map((project, i) =><span key={i}>{i + 1}</span>);
        return (
            <div ref='counter' className='counter'>
                <div className='number-mask'><div ref='projectNumber' className='numbers'>{numbers}</div></div><div><p>/{`${this.props.projects.length}`}</p></div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentIndex: state.projectReducer.currentIndex,
    projects: state.projectReducer.projects
})

export default connect(
    mapStateToProps)(Counter)