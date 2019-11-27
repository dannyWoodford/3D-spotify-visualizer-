import React, { Component } from 'react';
import './App.css';
import SideContainer from './containers/SideContainer';
import MainContainer from './containers/MainContainer';
// import Header from './components/Header';


const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: '252041f667a24504bf96dda664f602df',
  clientSecret: '7922977ccbba48d1b927de4eba2a1d3f',
  redirectUri: 'http://localhost:8888/callback'
})

class App extends Component {

  state={
    nowPlaying: {
      title: "",
      image: "",
      artist: "",
      uris: [],
      song_id: ""
      },
    songAnalysis: []
  }
 
  params = this.getHashParams()
  params = spotifyApi.setAccessToken(this.params.access_token)
  
  getNowPlaying = () => {
  
    spotifyApi.getMyCurrentPlaybackState({
    })
    .then((response) => {
      console.dir(response.body.item)
      this.setState({
        nowPlaying: {
          title: response.body.item.name,
          image: response.body.item.album.images[0].url,
          artist: response.body.item.artists[0].name,
          uris: response.body.item.uri,
          song_id: response.body.item.id
        }
      })
    }, (err) => {
      console.log('Something went wrong!', err);
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


  componentDidMount(){
    this.getNowPlaying()
    this.getAudioAnalysis()
  }


  getAudioAnalysis = () => {
    let accessToken = sessionStorage.getItem('accessToken')
    setTimeout(() =>{
      
      fetch(`https://api.spotify.com/v1/audio-analysis/${this.state.nowPlaying.song_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`     
        }
      })
      .then(resp => resp.json())
      .then((song_data) => {
        console.dir(song_data)
        this.setState({
          songAnalysis: song_data
        }) 
      })
    }, 1000)
  }




  render(){

    return (
      <div className="App" >
        <SideContainer getNowPlaying={this.getNowPlaying} nowPlaying={this.state.nowPlaying}/>
        <MainContainer songAnalysis={this.state.songAnalysis} getAudioAnalysis={this.getAudioAnalysis} getNowPlaying={this.getNowPlaying} nowPlaying={this.state.nowPlaying}/>
      </div>
    )
  }
}

export default App;
