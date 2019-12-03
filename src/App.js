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

  }
 
  params = this.getHashParams()
  params = spotifyApi.setAccessToken(this.params.access_token)
  
  getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState({
    })
    .then((response) => {
      // console.dir(response.body)
    
      if(response.body == null){
        return null
      }
      else if(response.body.device.is_active === true){
        this.setState({
          isActive: true,
        nowPlaying: {
          title: response.body.item.name,
          image: response.body.item.album.images[0].url,
          artist: response.body.item.artists[0].name,
          uris: response.body.item.uri,
          song_id: response.body.item.id
        }
      })
    }
  })
  }

  getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    // console.log(hashParams.access_token)
    let access = hashParams.access_token
    sessionStorage.setItem('accessToken', access);

    return hashParams;
  }





  render(){

    return (
      <div className="App" >
        {/* <button onClick={() => console.log(this.state.nowPlaying.song_id)}>song_id state</button>
        <button onClick={() => this.getNowPlaying()}>get getNowPlaying</button> */}

        <SideContainer getNowPlaying={this.getNowPlaying} nowPlaying={this.state.nowPlaying}/>
        <MainContainer key={this.state.song_id} 
        // songAnalysis={this.state.songAnalysis} getAudioAnalysis={this.getAudioAnalysis} 
        getNowPlaying={this.getNowPlaying} nowPlaying={this.state.nowPlaying} isActive={this.state.isActive}/>
      </div>
    )
  }
}

export default App;
