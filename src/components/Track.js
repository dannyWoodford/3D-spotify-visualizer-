import React, { Component } from 'react';

class Track extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>{this.props.url}</h1>
            </div>
        );
    }
}

export default Track;
