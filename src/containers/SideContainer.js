import React, { Component } from 'react';
import NowPlaying from '../components/NowPlaying.js'
class SideContainer extends Component {
    state = { isMounted: true };




    render() {
        return (
            <div id="side-container"  >
                <div id="songs">
                </div>
                <NowPlaying hasAnalysis={this.props.hasAnalysis} getNowPlaying={this.props.getNowPlaying} nowPlaying={this.props.nowPlaying} />
            </div>
        );
    }
}

export default SideContainer;
