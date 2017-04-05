import React, { Component } from 'react';

import './Media.css';
import Cover from './Cover';
import Audio from './Audio';
import Info from './Info';
import Controls from './Controls';

class Media extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: true,
      ended: false,
      volumeLevel: 0,
      playbackRate: 1,
      currentTime: 0,
      duration: 0
    };
  }

  componentDidMount() {
    var clock;

    this.audio.onloadedmetadata = () => {
      this.setState({
        paused: true,
        ended: false,
        volumeLevel: 3,
        playbackRate: 1,
        duration: this.audio.duration
      });
    }

    this.audio.onplay = () => {
      this.setState({ paused: false, ended: false });
      clock = setInterval(() => {
        this.setState({ currentTime: this.audio.currentTime });
      }, 100);
    }

    this.audio.onpause = () => {
      this.setState({ paused: true });
      clearInterval(clock);
    }

    this.audio.onvolumechange = () => {
      if (this.audio.volume === 0)
        this.setState({ volumeLevel: 0 });
      else if (this.audio.volume > 0 && this.audio.volume < 0.33)
        this.setState({ volumeLevel: 1 });
      else if (this.audio.volume > 0.33 && this.audio.volume < 0.66)
        this.setState({ volumeLevel: 2 });
      else if (this.audio.volume > 0.66)
        this.setState({ volumeLevel: 3 });
    }

    this.audio.onratechange = () => {
      this.setState({ playbackRate: this.audio.playbackRate });
    }

    this.audio.onended = () => {
      this.setState({ ended: true });
    }
  }

  adjustVolume(e) {
    this.audio.volume = e.currentTarget.value;
  }

  handlePlayPause() {
    if (this.audio.paused)
      this.audio.play();
    else
      this.audio.pause();
  }

  handleForwardBackward(value) {
    if (this.audio.paused)
      this.audio.play();
    this.audio.currentTime += value;
  }

  updatePlaybackRate(value) {
    this.audio.playbackRate = parseFloat(value);
  }

  // seek(event) {
  //   console.log(event);
  //   console.log(event.clientX);
  //   console.log(event.currentTarget.offsetLeft);
  //   console.log(event.clientX - event.currentTarget.offsetLeft - (event.currentTarget.offsetLeft / 2));
  //   const barEndX = event.currentTarget.getBoundingClientRect().left + event.currentTarget.clientWidth;
  //   console.log('barEndX', barEndX);
  //   const barClickX = event.clientX - event.currentTarget.offsetLeft - (event.currentTarget.offsetLeft / 2);
  //   console.log('barClickX', barClickX);
  //   console.log('final', (barClickX * 100) / barEndX);
  // }

  render() {
    return (
      <div className="Media">
        <Cover cover={this.props.cover} album={this.props.album} />
        <Audio
          currentTime={this.state.currentTime}
          duration={this.state.duration}
          ended={this.state.ended} />
        <Info
          title={this.props.title}
          album={this.props.album}
          author={this.props.author} />
        <Controls
          playbackRate={this.state.playbackRate}
          paused={this.state.paused}
          volumeLevel={this.state.volumeLevel}
          adjustVolume={this.adjustVolume.bind(this)}
          handlePlayPause={this.handlePlayPause.bind(this)}
          handleForwardBackward={this.handleForwardBackward.bind(this)}
          updatePlaybackRate={this.updatePlaybackRate.bind(this)} />
        <audio
          ref={audio => { this.audio = audio }}
          src={this.props.src}>
          Your browser does not support the <code>audio</code> element.
        </audio>
      </div>
    );
  }
}

export default Media;