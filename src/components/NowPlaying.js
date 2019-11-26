import React, { Component } from 'react';



class NowPlaying extends Component {

    // componentDidMount(){
    //     this.props.getNowPlaying()
    //     console.log('p')
    // }

    
    render() {
       
        return (
            <div id="now-playing">
                <img id="album-cover" src={this.props.nowPlaying.image} alt="album cover"   />
                <h5 id="title">{this.props.nowPlaying.title}</h5>
                <h4 id="artist">{this.props.nowPlaying.artist}</h4>
            </div>
        );
    }
}

export default NowPlaying;
