import {
  GET_TRACKS,
  PLAY,
  SKIP,
  SET_CURRENT_TIME,
  ADJUST_VOLUME,
  UPDATE_PLAYBACK_RATE,
  SET_TRACK,
  ENABLE_CONTROLS
} from './../actions/types';

const INITIAL_STATE = {
  paused: true,
  currentTime: 0,
  duration: 0,
  volume: 0,
  playbackRate: 1,
  tracks: [],
  currentTrackID: 1,
  loading: true,
  defaultTrack: {
    id: 1,
    cover: "cover.jpg",
    title: "Three Little Birds",
    author: "Bob Marley",
    album: "The best of Bob Marley & the Wailers",
    src: "02+Three+Little+Birds.mp3"
  }
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_TRACKS:
      return { ...state, tracks: action.payload }
    case PLAY:
      return { ...state, paused: action.payload }
    case SKIP:
      return { ...state, paused: action.payload }
    case SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload }
    case ADJUST_VOLUME:
      return { ...state, volume: action.payload }
    case UPDATE_PLAYBACK_RATE:
      return { ...state, playbackRate: action.payload }
    case SET_TRACK:
      return {
        ...state,
        currentTime: action.payload.currentTime,
        currentTrackID: action.payload.currentTrackID,
        duration: action.payload.duration,
        paused: action.payload.paused,
        playbackRate: action.payload.playbackRate,
        loading: action.payload.loading
      }
    case ENABLE_CONTROLS:
      return { ...state, loading: action.payload }
    default:
      return state;
  }
}