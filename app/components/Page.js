import React from 'react';
import PropTypes from 'prop-types';

const Page = props => (
  <img
    id={props.id}
    key={props.id}
    className="image"
    draggable="false"
    alt={props.alt}
    src={`file:///${props.src}`}
    style={{ width: `${props.width}%` }}
  />
);

Page.propTypes = {
  alt: PropTypes.string.isRequired,
  id: PropTypes.string, // eslint-disable-line
  src: PropTypes.string, // eslint-disable-line
  width: PropTypes.number.isRequired
};

export default Page;
