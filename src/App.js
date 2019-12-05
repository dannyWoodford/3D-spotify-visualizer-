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
    isActive: false, 
    nowPlaying: {
      title: "",
      image: "",
      artist: "",
      uris: [],
      song_id: ""
      },
      firstSong: true,
      hasAnalysis: false,
      songAnalysis: undefined,
      energy: 0,
  }
 
  params = this.getHashParams()
  params = spotifyApi.setAccessToken(this.params.access_token)
  
  getNowPlaying = () => {
    let accessToken = sessionStorage.getItem('accessToken')

    spotifyApi.getMyCurrentPlaybackState({
    })
    .then((response) => {
      // console.dir(response.body)
    
      if(response.body == null){
        return null
      }
      else if(response.body.device.is_active === true){
        this.getSongAnalysis(accessToken, response)
        this.getSongFeatures(accessToken, response)
      }
    })
}

  getSongAnalysis = (accessToken, response) => {
    fetch(`https://api.spotify.com/v1/audio-analysis/${response.body.item.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`     
          }
        })
        .then(resp => resp.json())
        .then((song_data) => {
          console.log("song analysis", song_data)
          this.setState({
            isActive: true,
            nowPlaying: {
              title: response.body.item.name,
              image: response.body.item.album.images[0].url,
              artist: response.body.item.artists[0].name,
              uris: response.body.item.uri,
              song_id: response.body.item.id
            },
            firstSong: false,
            songAnalysis: song_data,
            hasAnalysis: true,
          })//, () => console.log("New song tempo should be: ", this.state.songAnalysis.track.tempo)
          // ) 
        })
  }

  getSongFeatures = (accessToken,response) => {
    fetch(`https://api.spotify.com/v1/audio-features/${response.body.item.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`     
      }
    })
    .then(resp => resp.json())
    .then((song_features) => {
      console.log("song features", song_features)
      this.setState({
       energy: song_features.energy
      })//, () => console.log("New song tempo should be: ", this.state.songAnalysis.track.tempo)
      // ) 
    })
  }

  getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    let access = hashParams.access_token
    sessionStorage.setItem('accessToken', access);

    return hashParams;
  }





  render(){

    return (
      <div className="App" >

        <SideContainer 
            getNowPlaying={this.getNowPlaying} 
            nowPlaying={this.state.nowPlaying}
            hasAnalysis={this.state.hasAnalysis}
        />
        <MainContainer 
            key={this.state.song_id} 
            getNowPlaying={this.getNowPlaying} 
            energy={this.state.energy}
            firstSong={this.state.firstSong}
            hasAnalysis={this.state.hasAnalysis}
            songAnalysis={this.state.songAnalysis}
            nowPlaying={this.state.nowPlaying} 
            isActive={this.state.isActive}
        />
      </div>
    )
  }
}

export default App;
