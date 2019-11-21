import React, { Component } from 'react';
import Track from '../components/Track.js'

class SideContainer extends Component {
    state = { isMounted: true };

    renderTracks = () => {
        // return this.props.tracks.map((song) => {
            return <Track {...this.props.tracks.track} />
        // })
      }

    render() {
        console.log(this.props.tracks)
        return (
            <div id="side-container" >
                {this.renderTracks()}
            </div>
        );
    }
}

export default SideContainer;
