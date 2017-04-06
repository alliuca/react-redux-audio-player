import React, { Component } from 'react';

class Audio extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // listeners
    this.refs.audio.onloadedmetadata = () => { this.props.onLoadedMetaData() };
    this.refs.audio.onloadstart = () => { this.props.onLoadStart() };
    this.refs.audio.onwaiting = () => { this.props.onWaiting() };
    this.refs.audio.oncanplaythrough = () => { this.props.onCanPlayThrough() };
    this.refs.audio.onplay = () => { this.props.onPlayPause() };
    this.refs.audio.onpause = () => { this.props.onPlayPause() };
  }

  render() {
    return (
      <audio
        ref="audio"
        preload="auto"
        src={this.props.src}>
        Your browser does not support the <code>audio</code> element.
      </audio>
    );
  }
}

export default Audio;