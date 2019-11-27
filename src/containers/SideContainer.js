import React, { Component } from 'react';
import Track from '../components/Track.js'
import NowPlaying from '../components/NowPlaying.js'
class SideContainer extends Component {
    state = { isMounted: true };

    renderTracks = () => {
        // return this.props.tracks.map((song) => {
            return <Track />
        // })
      }


    render() {
        return (
            <div id="side-container"  >
                <div id="songs">
                {/* {this.renderTracks()} */}
                </div>
                <NowPlaying getNowPlaying={this.props.getNowPlaying} nowPlaying={this.props.nowPlaying} />
            </div>
        );
    }
}

export default SideContainer;
