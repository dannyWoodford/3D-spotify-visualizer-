import React from "react"
import Visuals from '../components/Visuals.js'
import Player from "../components/Player.js";

class MainContainer extends React.Component {
    state = { 
      isMounted: true,
       };

  
    render() {
      const { isMounted = true } = this.state;
      return (
        <div id="main-container" > 
            <a href="http://localhost:8888" >
                <button className="login">Login to Spotify</button>
            </a>
          {isMounted && <Visuals />}
          <Player getNowPlaying={this.props.getNowPlaying} isMounted={this.state.isMounted} nowPlaying={this.props.nowPlaying}/>
        </div>
      );
    }
  }
  
export default MainContainer 