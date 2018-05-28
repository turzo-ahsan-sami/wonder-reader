import React from 'react';

const Page = (props) => {
  return (
    <img
      id={props.id}
      key={props.id}
      className="image"
      draggable="false"
      alt={props.alt}
      src={`file:///${props.src}`}
      style={{width: `${props.width}%`}}/>
  );
};

export default Page;
