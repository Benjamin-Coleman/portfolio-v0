import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProjectData } from './actions/projectsActions'
import { screenResize } from './actions/index'
import SplashScreen from './components/SplashScreen'
import Header from './components/Header'
import ProjectContainer from './components/ProjectContainer'
import About from './components/About'
import Counter from './components/Counter'
import Project from './components/Project'

import data from './components/projects.json'


class App extends Component {

  componentWillMount = () => {
    this.props.fetchProjectData(data)
  }

  componentDidMount = () => {
    this.onResize()
    window.addEventListener('resize', () => this.onResize());
  }

  onResize = () => {

    const width = this.getWidth();
    const height = this.getHeight();

    this.props.onResize({ width : width , height : height});

  }

  getHeight = () => {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  getWidth = () => {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  render() {
    return (
      <div className="App">
        <SplashScreen/>
        <div className="wrapper">
          <Route path='/' component={ Header }/>
          <Route path='/' component={ About }/>
          <Route path='/' component={ ProjectContainer }/>
          <Route path='/' component={ Counter }/>
          <Route exact path='/projects/:title' component={Project} />
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    viewport: state.uiReducer
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProjectData: (data) => {
    dispatch(fetchProjectData(data))
  },
  onResize: (viewport) => {
    dispatch(screenResize(viewport))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
