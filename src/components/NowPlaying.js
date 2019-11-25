import React, { Component } from 'react';


class NowPlaying extends Component {

 

    render() {
        return (
            <div id="now-playing">
                <button onClick={() => this.props.getNowPlaying()} >get now playing</button>
                {/* <h6>Now Playing:</h6> */}
                <h3 id="title">{this.props.nowPlaying.title}</h3>
                <h3 id="artist">{this.props.nowPlaying.artist}</h3>
                <img id="album-cover" src={this.props.nowPlaying.image} alt="album cover"   />
            </div>
        );
    }
}

export default NowPlaying;
