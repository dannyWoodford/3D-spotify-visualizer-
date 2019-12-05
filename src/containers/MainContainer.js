import React from "react"
import Visuals from '../components/Visuals.js'
import Player from "../components/Player.js";



class MainContainer extends React.Component {
    

    shouldComponentUpdate(nextProps, nextState){
      return nextProps.nowPlaying.song_id !== this.props.nowPlaying.song_id || nextProps.firstSong !== this.props.firstSong 
    }
    
    componentDidUpdate(){
      this.props.getNowPlaying()
    }

  
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