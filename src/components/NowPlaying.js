import React, { Component } from 'react';
// import { TweenLite, TimelineMax, Expo, Linear, Back, Sine } from 'gsap';


class NowPlaying extends Component {


    componentDidMount(){
        this.props.getNowPlaying()
        // this.animateImage()
    }

    // animateImage(){
    
    // this.tl = new TimelineMax();
    // // this.tl.from(this.myElement.rotation, .5, {x:"+=30", ease:Expo.easeOut});
    // this.tl.to(this.myElement, 0.5, {y: 100, rotation: 180})
    // }

    
    render() {
        return (
            <div id="now-playing">
                {this.props.hasAnalysis ? <img ref={div => this.myElement = div} id="album-cover" src={this.props.nowPlaying.image} alt="album cover"   /> : console.log("no photo")}
                <h5 id="title">{this.props.nowPlaying.title}</h5>
                <h4 id="artist">{this.props.nowPlaying.artist}</h4>
            </div>
        );
    }
}

export default NowPlaying;
