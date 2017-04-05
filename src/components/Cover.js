import React from 'react';

import './Cover.css';

const Cover = (props) => {
  return (
    <div className="Cover">
      <img className="Cover-image" src={props.cover} alt={props.album} />
    </div>
  );
}

export default Cover;