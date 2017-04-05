import React from 'react';

import './Info.css';

const Cover = (props) => {
  return (
    <div className="Info">
      <h3 className="Info-title">{props.title}</h3>
      <span className="Info-album">{props.album}</span>
      <span className="Info-author">{props.author}</span>
    </div>
  );
}

export default Cover;