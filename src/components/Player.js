import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Player.css';
import Media from './Media';

class Player extends Component {
  renderMediaList() {
    return this.props.player.mediaList.map(media => {
      return (
        <Media
          key={media.id}
          cover={require(`./../media/${media.cover}`)}
          src={require(`./../media/${media.src}`)}
          title={media.title}
          author={media.author}
          album={media.album} />
      );
    });
  }

  render() {
    return (
      <div className="Player">
        {this.renderMediaList()}
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => {
  return { player }
}

export default connect(mapStateToProps)(Player);