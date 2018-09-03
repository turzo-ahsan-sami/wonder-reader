import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ alt, id, src, width }) => (
  <img
    alt={alt}
    className="image"
    draggable="false"
    id={id}
    key={id}
    src={`file:///${src}`}
    style={{ width: `${width}%` }}
  />
);

Page.propTypes = {
  alt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired, // eslint-disable-line
  key: PropTypes.string.isRequired, // eslint-disable-line
  src: PropTypes.string.isRequired, // eslint-disable-line
  width: PropTypes.number.isRequired
};

export default Page;
