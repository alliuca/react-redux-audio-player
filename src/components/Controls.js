import React, { Component } from 'react';

import './Controls.css';

class Controls extends Component {
  constructor(props) {
    super(props);

    this.playbackRateOptions = [0.5, 1, 1.25, 1.75, 2];
  }

  showPlaybackRateOptions(target) {
    const visibility = target.nextSibling.style.display;
    if (typeof visibility === 'undefined' || visibility === 'none')
      target.nextSibling.style.display = 'block';
    else
      target.nextSibling.style.display = 'none';
  }

  render() {
    return (
      <div className="Controls">
        <div className="Controls-container Controls-container--playback">
          <button
            className="Controls-playback"
            onClick={(e) => { this.showPlaybackRateOptions(e.target) }}>
            {this.props.playbackRate}x
          </button>
          <ul className="Controls-playback-rate-list">
            {this.playbackRateOptions.map((opt) => {
              return (
                <li
                  key={opt}
                  value={opt}
                  style={this.props.playbackRate === opt ? { color: '#3a3a3a', fontWeight: 'bold' } : {}}
                  onClick={(e) => this.props.updatePlaybackRate(e.target.getAttribute('value'))}>
                    {opt}x
                </li>
              );
            })}
          </ul>
        </div>
        <div className="Controls-container Controls-container--main">
          <button onClick={() => this.props.handleForwardBackward(-30.0)}>
            <i className="icon icon-btn-rewind"></i>
          </button>
          <button className="Controls-play" onClick={this.props.handlePlayPause.bind(this)}>
            <i className={this.props.paused ? 'icon icon-btn-play' : 'icon icon-btn-pause'}></i>
          </button>
          <button onClick={() => this.props.handleForwardBackward(+30.0)}>
            <i className="icon icon-btn-fastforward"></i>
          </button>
        </div>
        <div
          className="Controls-container Controls-container--volume"
          onMouseEnter={(e) => { e.currentTarget.lastChild.disabled = false }}
          onMouseLeave={(e) => { e.currentTarget.lastChild.disabled = true }}>
          <button className="Controls-volume">
            <i className={`icon icon-btn-volume${this.props.volumeLevel}`}></i>
          </button>
          <input
            className="Controls-volume-range"
            type="range"
            min="0"
            max="1.00"
            step="0.01"
            disabled
            onChange={this.props.adjustVolume.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Controls;