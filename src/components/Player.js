import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

class Player extends Component {

    // stopVisual() {
    //     this.setState({
    //         isMounted: false
    //     })
    // }

    renderPlayer = () => {
        let data = sessionStorage.getItem('accessToken')

        return <SpotifyPlayer styles={{
            altColor: 'rgb(255, 0, 0)',
            bgColor: 'rgba(255,255,255,.08)',
            sliderHandleColor: 'rgba(255, 255, 255, 0.698)',
            sliderColor: "rgba(0,0,255, 0.7)",
            sliderTrackColor: "rgba(255,255,255, .2)",
            color: 'rgba(255, 255, 255, .6)',
            loaderColor: 'gba(0,0,0,.2)',
            trackArtistColor: 'rgba(255,255,255,.0)',
            trackNameColor: 'rgba(255,255,255,.0)',
          }} token={data} uris={this.props.nowPlaying.uris} 
          callback={(state) => {
        
            setTimeout(
                this.props.getNowPlaying
                , 300)
            }}
          />;
      }


    //   componentDidUpdate(prevProps, prevState){
    //       if(this.props.nowPlaying.song_id !== prevProps.nowPlaying.song_id){
    //           this.props.getNowPlaying()
    //             // setTimxeout(() =>{
    //         // this.props.getAudioAnalysis()
    //     // },100)
    // }
    // // console.log("hhh",this.props.songAnalysis)
    // }
    
    render() {
        // setTimeout(() =>{
        // },100)
        return (
            <div id="player"  >
                {this.renderPlayer()}
            </div>
        );
    }
}

export default Player;
