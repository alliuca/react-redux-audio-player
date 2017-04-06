import React, { Component } from 'react';

import styles from './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);
  }

  getCover(src) {
    return require(`./../images/media/${src}`);
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
    return { width: `${width}%` };
  }

  render() {
    return (
      <div className={styles.track}>
        <div className={styles.cover}>
          <img className={styles.cover_image} src={this.getCover(this.props.cover)} alt={this.props.album} />
        </div>
        <div className={styles.status}>
          <span className={styles.status_current}>{this.renderTime(this.props.currentTime)}</span>
          <span className={[styles.status_progress, this.props.loading ? styles.status_progress__loading : ''].join(' ')}>
            <span className={styles.status_progress_track} style={this.updateProgress()}></span>
          </span>
          <span className={styles.status_duration}>{this.renderTime(this.props.duration)}</span>
        </div>
        <div className={styles.info}>
          <h3 className={styles.info_title}>{this.props.title}</h3>
          <span className={styles.info_album}>{this.props.album}</span>
          <span className={styles.info_author}>{this.props.author}</span>
        </div>
      </div>
    );
  }
}

export default Track;