import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

class Player extends Component {


    renderPlayer = () => {
        let data = sessionStorage.getItem('accessToken')

        return <SpotifyPlayer styles={{
            altColor: 'rgb(255, 0, 0)',
            bgColor: 'rgba(255,0,0,.1)',
            sliderHandleColor: 'rgba(255, 255, 255, 0.698)',
            sliderColor: "rgba(0,0,255, 1)",
            sliderTrackColor: "rgba(255,255,255, .2)",
            color: 'rgba(255, 255, 255, .6)',
            loaderColor: 'gba(0,0,0,.2)',
            trackArtistColor: 'rgba(255,255,255,.0)',
            trackNameColor: 'rgba(255,255,255,.0)',
          }} token={data} uris={this.props.nowPlaying.uris} 
            callback={(state) => {
            console.log(state)
            console.log(state.nextTracks)
            setTimeout(
                this.props.getNowPlaying
                , 400)
            }}  
            />
    }


    render() {
        return (
            <div id="player"  >
                {this.renderPlayer()}
            </div>
        );
    }
}

export default Player;
