import React, { Component } from 'react';

import './Audio.css';

class Audio extends Component {
  constructor(props) {
    super(props);
  }

  renderTime(time) {
    var min = Math.floor(time / 60),
        sec = Math.floor(time - min * 60),
        hrs = Math.floor(time / 3600);
    min = min >= 10 ? min : `0${min}`;
    sec = sec >= 10 ? sec : `0${sec}`;
    hrs = hrs >= 10 ? hrs : `0${hrs}`;
    return `${hrs}:${min}:${sec}`;
  }

  updateProgress() {
    var width = (this.props.currentTime * 100) / this.props.duration;
    if (isNaN(width))
      width = 0;
    if (this.props.ended)
      width = 100;
    return { width: `${width}%` };
  }

  render() {
    return(
      <div className="Audio">
        <span className="Audio-current">{this.renderTime(this.props.currentTime)}</span>
        <span className="Audio-progress">
          <span className="Audio-progress-track" style={this.updateProgress()}></span>
        </span>
        <span className="Audio-duration">{this.renderTime(this.props.duration)}</span>
      </div>
    );
  }
}

export default Audio;