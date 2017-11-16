import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProjectData } from './actions/projectsActions'
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

  render() {
    return (
      <div className="App">
        <SplashScreen Route exact path='/' />
        <div className="wrapper">
          <Header Route exact path='/' />
          <About Route exact path='/' />
          <ProjectContainer Route exact path='/' />
          <Counter Route exact path='/' />
          <Route exact path='/projects/:title' component={Project} />
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProjectData: (data) => {
    dispatch(fetchProjectData(data))
  }
})

export default connect(null, mapDispatchToProps)(App);
