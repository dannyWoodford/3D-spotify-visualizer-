import React, { Component } from 'react';
import './App.css';
import SideContainer from './containers/SideContainer';
import MainContainer from './containers/MainContainer';


const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: '252041f667a24504bf96dda664f602df',
  clientSecret: '7922977ccbba48d1b927de4eba2a1d3f',
  redirectUri: 'http://localhost:8888/callback'
})

class App extends Component {

  state={
    loggedIn: false,
    nowPlaying: {
      title: "",
      image: "",
      artist: ""
      }
  }
 
  params = this.getHashParams()
  params = spotifyApi.setAccessToken(this.params.access_token)
 

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState({
    })
    .then((response) => {
      console.dir(response.body.item)
      this.setState({
        nowPlaying: {
          title: response.body.item.name,
          image: response.body.item.album.images[0].url,
          artist: response.body.item.artists[0].name
        }
      })
    }, (err) => {
      console.log('Something went wrong!', err);
    });
  }

  getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  loggedInStatus() {
    if(this.getHashParams()){
      this.setState({
        loggedIn: true
      })
    } else if(!this.getHashParams()){
      this.setState({
        loggedIn: false
      })
    }
  }




  render(){
  
    return (
      <div className="App">
        <SideContainer  getNowPlaying={() => this.getNowPlaying()} nowPlaying={this.state.nowPlaying}/>
        <MainContainer />
      </div>
    )
  }
}

export default App;
