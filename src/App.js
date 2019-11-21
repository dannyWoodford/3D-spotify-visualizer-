import React, { Component } from 'react';
import './App.css';
import SideContainer from './containers/SideContainer';
import MainContainer from './containers/MainContainer';


class App extends Component {

  state={
    tracks: []
  }

  componentDidMount = () => {
    fetch('http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=0e477d7f515a01c8a94443fee5d8a63e&artist=Al+Green&track=Love+And+Happiness&format=json')
        .then(res => res.json())
        .then(songs => this.setState({tracks: songs}))
  }


  render(){
    
    return (
      <div className="App">
        <SideContainer tracks={this.state.tracks} />
        <MainContainer />
      </div>
    )
  }
}

export default App;
