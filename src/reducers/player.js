const INITIAL_STATE = {
  paused: true,
  volumeLevel: 0,
  playbackRate: 1,
  mediaList: [
    {
      id: 1,
      cover: 'cover.jpg',
      title: 'Three Little Birds',
      author: 'Bob Marley',
      album: 'The best of Bob Marley & the Wailers',
      src: '02+Three+Little+Birds.mp3'
    }
  ]
};

export default (state = INITIAL_STATE, action) => {
  return state;
}