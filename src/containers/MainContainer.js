import React from "react"
import Visuals from '../components/Visuals.js'
import Player from "../components/Player.js";

class MainContainer extends React.Component {
    state = { 
      isMounted: false,
      hasAnalysis: false,
      songAnalysis: []
      };
    
    // componentDidMount(){
    //   this.getAudioAnalysis()
    // }

    shouldComponentUpdate(nextProps, nextState){
      // console.log("component sould update?", nextProps.isActive !== this.props.isActive)
      console.log(this.state.songAnalysis)
      return nextProps.nowPlaying.song_id !== this.props.nowPlaying.song_id 
      // return nextState.songAnalysis.length > this.state.songAnalysis
    }

    componentDidUpdate(){
      this.isSongPlaying()
      // console.log("woweeee")
      this.getAudioAnalysis()
      // console.log("song analysis", this.state.songAnalysis)
    }

    isSongPlaying(){
        this.setState({
          isMounted: true
        })
    }

    getAudioAnalysis = () => {
      // console.log("HELLOOOOOO")
      let accessToken = sessionStorage.getItem('accessToken')

        fetch(`https://api.spotify.com/v1/audio-analysis/${this.props.nowPlaying.song_id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`     
          }
        })
        .then(resp => resp.json())
        .then((song_data) => {
          console.dir(song_data)
          this.setState({
            songAnalysis: song_data,
            hasAnalysis: true
          }, 
          // () => console.log("STATE AFTER GET AUDIO", this.state)
          ) 
        })
        // .then(() => this.setState({hasAnalysis: true}))
    }

  
    render() {
      return (
        <div id="main-container" > 
            <a href="http://localhost:8888" >
                <button className="login">Login to Spotify</button>
            </a>
          
          {this.state.hasAnalysis ? <Visuals song_id={this.props.nowPlaying.song_id} songAnalysis={this.state.songAnalysis} /> : console.log('bad', this.state.songAnalysis.length)}
          <Player getSong_id={this.getSong_id}  getNowPlaying={this.props.getNowPlaying} isMounted={this.state.isMounted} nowPlaying={this.props.nowPlaying}/>
        </div>
      );
    }
  }
  
export default MainContainer 