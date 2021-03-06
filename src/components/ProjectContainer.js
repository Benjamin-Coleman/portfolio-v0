import React from "react";
import data from "./projects.json";
import { TimelineMax } from "gsap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Hammer from "hammerjs";
import * as actions from "../actions/projectsActions";
import ProjectImage from "./ProjectImage";
import ProjectControls from "./ProjectControls";
import ProjectHeader from "./ProjectHeader";
import ProjectDetails from "./ProjectDetails";
// import { projectOpen } from '../actions/projectsActions';

class ProjectContainer extends React.Component {
  state = {
    // currentProject: data.projects[0],
    // currentProjectIndex: 0,
    projects: data.projects
  };

  componentWillMount = () => {
    this.tl = new TimelineMax();
    this.canScroll = true;
  };

  componentDidMount = () => {
    this.visualEls = document.getElementsByClassName("project project-image");
    this.projectContainer = document.querySelector(".projects-container");
    this.mc = new Hammer.Manager(this.projectContainer, {
      recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }]]
    });
    this.addListerners();

    // // Create a manager to manager the element
    // const manager = new Hammer.Manager(document.querySelector('.project-image'));

    // // Create a recognizer
    // const Swipe = new Hammer.Swipe();

    // // Add the recognizer to the manager
    // manager.add(Swipe);

    // manager.on('swipe', function(e) {
    // 	var direction = e.offsetDirection;
    // 	if (direction === 4) {
    // 	}
    // 	}
    // )

    // listen to events...
    // this.mc.on("panleft", ev => {
    //   if (this.canScroll) {
    //     this.canScroll = false;
    //     setTimeout(() => (this.canScroll = true), 400);
    //     this.props.actions.decrementProject();
    //   }
    // });

    // this.mc.on("panright", ev => {
    //   if (this.canScroll) {
    //     this.canScroll = false;
    //     setTimeout(() => (this.canScroll = true), 400);
    //     this.props.actions.incrementProject();
    //   }
    // });

    this.visualEls[0].classList.add("--is-active");
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.projectOpen) {
      this.removeListeners();
    } else if (this.props.projectOpen && nextProps.projectOpen === false) {
      this.addListerners();
    }
  };

  addListerners = () => {
    document.addEventListener("keyup", this.onKeyUp, false);
    document.addEventListener("wheel", this.onWheel, false);
    this.onSwipe();
    this.mc.get("pan").set({ enable: true });
  };

  removeListeners = () => {
    document.removeEventListener("keyup", this.onKeyUp, false);
    document.removeEventListener("wheel", this.onWheel, false);
    this.mc.get("pan").set({ enable: false });
  };

  onKeyUp = ev => {
    if (ev.keyCode === 39 || ev.keyCode === 40) {
      this.props.actions.incrementProject();
    } else if (ev.keyCode === 37 || ev.keyCode === 38) {
      this.props.actions.decrementProject();
    }
  };

  onWheel = ev => {
    ev.preventDefault();
    if (ev.deltaY > 50 && this.canScroll) {
      this.canScroll = false;

      setTimeout(() => (this.canScroll = true), 800);

      this.props.actions.incrementProject();
    } else if (ev.deltaY < -50 && this.canScroll) {
      this.canScroll = false;

      setTimeout(() => (this.canScroll = true), 800);

      this.props.actions.decrementProject();
    }
  };

  onSwipe = ev => {
    this.mc.on("panleft", ev => {
      if (this.canScroll) {
        this.canScroll = false;
        setTimeout(() => (this.canScroll = true), 400);
        this.props.actions.decrementProject();
      }
    });
    this.mc.on("panright", ev => {
      if (this.canScroll) {
        this.canScroll = false;
        setTimeout(() => (this.canScroll = true), 400);
        this.props.actions.incrementProject();
      }
    });
  };

  // nextProject = () => {
  // 	console.log('going to next project')

  // 	const nextProjectIndex = this.state.currentProjectIndex === this.state.projects.length - 1 ? 0 : this.state.currentProjectIndex + 1
  // 	// const nextProject = data.projects[this.state.currentProjectIndex + 1]
  // 	this.setState({currentProject: data.projects[nextProjectIndex], currentProjectIndex: nextProjectIndex})

  // 	const visualActive = this.visualEls[nextProjectIndex];

  //     for (let i = 0; i < this.visualEls.length; i++) {
  //       this.visualEls[i].classList.remove('--is-active');
  //     }

  //     visualActive.classList.add('--is-active');

  //     // TweenMax.fromTo(visualActive, 1, {y: 50, opacity: 0, scale: 1.1}, {opacity: 1, y: 0, scale: 1, ease: "Power2"})

  // this.tl.clear();
  //    this.tl.kill();

  //    // const x = -direction * 0;

  //    this.tl
  //      .fromTo(visualActive, 2, {scale: 1.08, x: '0' + '%'}, {scale: 1, x: "0%", ease: 'Expo'});
  // }

  // previousProject = () => {
  // 	console.log('going to previous project')

  // 	// const previousProject = data.projects[this.state.currentProjectIndex - 1]
  // 	const previousProjectIndex = this.state.currentProjectIndex === 0 ? this.state.projects.length - 1 : this.state.currentProjectIndex - 1
  // 	this.setState({currentProject: data.projects[previousProjectIndex], currentProjectIndex: previousProjectIndex})

  // 	const visualActive = this.visualEls[previousProjectIndex];

  //     for (let i = 0; i < this.visualEls.length; i++) {
  //       this.visualEls[i].classList.remove('--is-active');
  //     }

  //     visualActive.classList.add('--is-active');

  //     // TweenMax.fromTo(visualActive, 1, {y: 50, opacity: 0, scale: 1.1}, {opacity: 1, y: 0, scale: 1, ease: "Power2"})

  // 	this.tl.clear();
  //     this.tl.kill();

  //     // const x = -direction * 0;

  //     this.tl
  //       .fromTo(visualActive, 2, {scale: 1.08, x: '0' + '%'}, {scale: 1, x: "0%", ease: 'Expo'});
  // }

  // changeProject(direction) {
  // 	//don't use this yet, should refactor so previous/next project just use a direction
  // }

  render() {
    const sanitizedURL =
      "/projects/" +
      this.props.projects[this.props.currentIndex].symbol
        .split(" ")
        .join("")
        .toLowerCase();
    return (
      <Link to={sanitizedURL}>
        <div className="projects-container">
          <ProjectImage />
          <ProjectControls
            currentProject={this.state.currentProject}
            nextProject={this.nextProject}
            previousProject={this.previousProject}
          />

          <div className="project-details-wrapper">
            <ProjectHeader
              title={this.state.projects[this.props.currentIndex].symbol}
            />
            <ProjectDetails
              currentProjectData={this.state.projects[this.props.currentIndex]}
            />
          </div>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = state => ({
  currentIndex: state.projectReducer.currentIndex,
  // projects: state.projects
  projects: state.projectReducer.projects,
  projectOpen: state.projectReducer.projectOpen
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer);
