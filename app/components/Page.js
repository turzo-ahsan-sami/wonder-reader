import PropTypes from 'prop-types';
import React from 'react';

const Page = ({
  alt,
  id,
  src,
  width
}) => (
  <img
    key={id}
    alt={alt}
    className="image"
    draggable="false"
    id={id}
    src={`file:///${src}`}
    style={{ width: `${width}%` }}
  />
);

Page.propTypes = {
  alt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};

export default Page;
