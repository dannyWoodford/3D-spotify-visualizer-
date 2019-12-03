import React from "react"
import Visuals from '../components/Visuals.js'
import Player from "../components/Player.js";



class MainContainer extends React.Component {
    // state = {
    //   firstSong: true,
    //   hasAnalysis: false,
    //   songAnalysis: undefined
    // };
    

    shouldComponentUpdate(nextProps, nextState){
      return nextProps.nowPlaying.song_id !== this.props.nowPlaying.song_id || nextProps.firstSong !== this.props.firstSong 
    }
    
    componentDidUpdate(){
      this.props.getNowPlaying()
    }


    // getAudioAnalysis = () => {
    //   // console.log("HELLOOOOOO")
    //   let accessToken = sessionStorage.getItem('accessToken')

    //     fetch(`https://api.spotify.com/v1/audio-analysis/${this.props.nowPlaying.song_id}`, {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`     
    //       }
    //     })
    //     .then(resp => resp.json())
    //     .then((song_data) => {
    //       console.log("promise", song_data.track.tempo)
    //       this.setState({
    //         firstSong: false,
    //         songAnalysis: song_data,
    //         hasAnalysis: true,
    //       })//, () => console.log("New song tempo should be: ", this.state.songAnalysis.track.tempo)
    //       // ) 
    //     })
    // }


  
    render() {
      return (
        <div id="main-container" > 
            <a href="http://localhost:8888" >
                <button className="login">Login to Spotify</button>
            </a>

          {this.props.hasAnalysis ? <Visuals energy={this.props.energy} song_id={this.props.nowPlaying.song_id} songAnalysis={this.props.songAnalysis} nowPlaying={this.props.nowPlaying} />  : console.log('no visual')}
          <Player getSong_id={this.getSong_id} getNowPlaying={this.props.getNowPlaying} nowPlaying={this.props.nowPlaying}/>
        </div>
      );
    }
  }
  
export default MainContainer 