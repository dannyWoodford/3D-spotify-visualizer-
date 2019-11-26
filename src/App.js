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
    accessToken: "",
    nowPlaying: {
      title: "",
      image: "",
      artist: "",
      uris: []
      }
  }
 
  params = this.getHashParams()
  params = spotifyApi.setAccessToken(this.params.access_token)
  
  getNowPlaying = () => {
    setTimeout(() =>{
    spotifyApi.getMyCurrentPlaybackState({
    })
    .then((response) => {
      console.dir(response.body.item)
      this.setState({
        nowPlaying: {
          title: response.body.item.name,
          image: response.body.item.album.images[0].url,
          artist: response.body.item.artists[0].name,
          uris: response.body.item.uri
        }
      })
    }, (err) => {
      console.log('Something went wrong!', err);
    })}, 100 )
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
    console.log('p')
}




  render(){
    // console.log(this.getHashParams())
    // console.log(data)
    return (
      <div className="App" >
        <SideContainer getNowPlaying={this.getNowPlaying} nowPlaying={this.state.nowPlaying}/>
        <MainContainer getNowPlaying={this.getNowPlaying} nowPlaying={this.state.nowPlaying}/>
      </div>
    )
  }
}

export default App;
