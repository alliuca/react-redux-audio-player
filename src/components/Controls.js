import React, { Component } from 'react';
window.rangetouch = require('rangetouch');

import styles from './Controls.css';

class Controls extends Component {
  constructor(props) {
    super(props);

    this.playbackRateOptions = [0.5, 1, 1.25, 2];
  }

  render() {
    return (
      <div className={styles.controls}>
        <div className={[styles.controls_container, styles.controls_container__main].join(' ')}>
          <button className={styles.controls_next} onClick={() => {this.props.onChangeTrack('prev')}}>
            <svg className="icon">
              <use xlinkHref="#icon-btn-prev" />
            </svg>
          </button>
          <button className={styles.controls_rewind} onClick={() => {this.props.onSkip(-30)}}>
            <svg className="icon">
              <use xlinkHref="#icon-btn-rewind" />
            </svg>
          </button>
          <button className={styles.controls_play} onClick={this.props.onPlay}>
            <svg className="icon">
              <use xlinkHref={this.props.paused ? '#icon-btn-play' : '#icon-btn-pause'} />
            </svg>
          </button>
          <button className={styles.controls_fastforward} onClick={() => {this.props.onSkip(+30)}}>
            <svg className="icon">
              <use xlinkHref="#icon-btn-fastforward" />
            </svg>
          </button>
          <button className={styles.controls_next} onClick={() => {this.props.onChangeTrack('next')}}>
            <svg className="icon">
              <use xlinkHref="#icon-btn-next" />
            </svg>
          </button>
        </div>
        <div className={[styles.controls_container, styles.controls_container__playback].join(' ')}>
          <ul className={styles.controls_playback_rate_list}>
            {this.playbackRateOptions.map((opt) => {
              return (
                <li
                  key={opt}
                  value={opt}
                  style={this.props.playbackRate === opt ? { color: '#898989', fontWeight: 'bold' } : {}}
                  onClick={(e) => this.props.onPlaybackRate(e.target.getAttribute('value'))}>
                    {opt}x
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={[styles.controls_container, styles.controls_container__volume].join(' ')}>
          <button className={styles.controls_volume}>
            <svg className={`icon ${this.props.volume === '0' ? styles.icon_btn_mute : ''}`}>
              <use xlinkHref={this.props.volume === '0' ? '#icon-btn-mute' : '#icon-btn-volume'} />
            </svg>
          </button>
          <input
            className={styles.controls_volume_range}
            type="range"
            min="0"
            max="1.00"
            step="0.01"
            onChange={(e) => this.props.onVolume(e.currentTarget.value)} />
        </div>
      </div>
    );
  }
}

export default Controls;