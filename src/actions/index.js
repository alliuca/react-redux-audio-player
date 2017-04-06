import {
  GET_TRACKS,
  PLAY,
  SKIP,
  ADJUST_VOLUME,
  SET_CURRENT_TIME,
  UPDATE_PLAYBACK_RATE,
  SET_TRACK,
  ENABLE_CONTROLS
} from './types';

export function getTracks() {
  const tracks = require('./../tracks.json');

  return {
    type: GET_TRACKS,
    payload: tracks
  }
}

export function play(audio) {
  if (audio.paused)
    audio.play();
  else
    audio.pause();

  return {
    type: PLAY,
    payload: audio.paused
  }
}

export function skip(audio, value) {
  if (audio.paused)
    audio.play();
  audio.currentTime += value;

  return {
    type: SKIP,
    payload: audio.paused
  }
}

export function adjustVolume(audio, value) {
  audio.volume = value;

  return {
    type: ADJUST_VOLUME,
    payload: value
  }
}

export function setCurrentTime(audio, currentTime) {
  return {
    type: SET_CURRENT_TIME,
    payload: currentTime
  }
}

export function setTrack(audio, track, paused) {
  const payload = {
    currentTime: 0,
    currentTrackID: track.id,
    duration: audio.duration,
    paused,
    playbackRate: 1,
    loading: false
  }

  if (!paused)
    audio.play();

  return {
    type: SET_TRACK,
    payload
  }
}

export function enableControls(audio, loading) {
  return {
    type: ENABLE_CONTROLS,
    payload: loading
  }
}

export function updatePlaybackRate(audio, value) {
  const float = parseFloat(value);
  audio.playbackRate = float;

  return {
    type: UPDATE_PLAYBACK_RATE,
    payload: float
  }
}