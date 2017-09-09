import React, { Component } from 'react';
import './App.css';
import SplashScreen from './components/SplashScreen'
import Header from './components/Header'
import ProjectContainer from './components/ProjectContainer'

class App extends Component {

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

export default App;
