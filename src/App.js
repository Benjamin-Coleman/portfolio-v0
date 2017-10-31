import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { fetchProjectData } from './actions/projectsActions'
import SplashScreen from './components/SplashScreen'
import Header from './components/Header'
import ProjectContainer from './components/ProjectContainer'

import data from './components/projects.json'


class App extends Component {



  componentWillMount = () => {
    this.props.fetchProjectData(data)
  }

  render() {
    return (
      <div className="App">
        <SplashScreen />
        <div className="wrapper">
          <Header />
          <ProjectContainer />
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
