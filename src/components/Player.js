import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import * as actions from './../actions';
import styles from './Player.css';
import Track from './Track';
import Controls from './Controls';
import Audio from './Audio';

class Player extends Component {
  componentWillMount() {
    this.props.getTracks();
    this.clock;
  }

  componentWillUnmount() {
    this.clock = null;
  }

  getTrack(id) {
    const { tracks } = this.props.player;
    return tracks.find((track) => track.id === id);
  }

  getTrackFile(src) {
    return require(`./../../public/media/${src}`);
  }
  
  handleLoadedMetaData() {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    const track = this.getTrack(this.props.player.currentTrackID);
    this.props.setTrack(audio, track, this.props.player.paused);
  }

  handleWaiting() {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.enableControls(audio, true);
  }

  handleLoadStart() {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.enableControls(audio, true);
  }

  handleCanPlayThrough() {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.enableControls(audio, false);
  }

  handlePlay() {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.play(audio);
  }

  handleSkip(value) {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.skip(audio, value);
  }

  handleVolume(value) {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.adjustVolume(audio, value);
  }

  handleCurrentTimeUpdate() {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    if (this.clock && audio.paused)
      clearInterval(this.clock);
    else
      this.clock = setInterval(() => {
        this.props.setCurrentTime(audio, audio.currentTime);
      }, 100);
  }

  handlePlaybackRate(value) {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    this.props.updatePlaybackRate(audio, value);
  }

  handleChangeTrack(prevNext) {
    const audio = ReactDOM.findDOMNode(this.refs.audio);
    const { tracks, currentTrackID } = this.props.player;
    const currentTrackIndex = tracks.findIndex((track) => track.id === currentTrackID);
    let newTrack;

    if (prevNext === 'prev') {
      if (tracks[currentTrackIndex].id === 1)
        newTrack = tracks[tracks.length - 1];
      else
        newTrack = tracks[currentTrackIndex - 1];
    } else if (prevNext === 'next') {
      if (tracks[currentTrackIndex].id === tracks.length)
        newTrack = tracks[0];
      else
        newTrack = tracks[currentTrackIndex + 1];
    }

    this.props.setTrack(audio, newTrack, this.props.player.paused);
  }

  render() {
    const { currentTrackID, currentTime, defaultTrack, duration, loading } = this.props.player;
    let track = this.getTrack(currentTrackID);
    if (track === undefined)
      track = defaultTrack;

    return (
      <div className={styles.Player}>
        <Track
          cover={track.cover}
          title={track.title}
          album={track.album}
          author={track.author}
          currentTime={currentTime}
          duration={duration}
          loading={loading} />
        <Controls
          paused={this.props.player.paused}
          volume={this.props.player.volume}
          playbackRate={this.props.player.playbackRate}
          onPlay={this.handlePlay.bind(this)}
          onSkip={this.handleSkip.bind(this)}
          onChangeTrack={this.handleChangeTrack.bind(this)}
          onVolume={this.handleVolume.bind(this)}
          onPlaybackRate={this.handlePlaybackRate.bind(this)} />
        <Audio
          ref="audio"
          src={this.getTrackFile(track.src)}
          onLoadStart={this.handleLoadStart.bind(this)}
          onLoadedMetaData={this.handleLoadedMetaData.bind(this)}
          onWaiting={this.handleWaiting.bind(this)}
          onCanPlayThrough={this.handleCanPlayThrough.bind(this)}
          onPlayPause={this.handleCurrentTimeUpdate.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => {
  return { player }
}

export default connect(mapStateToProps, actions)(Player);