import PropTypes from 'prop-types';
import React from 'react';

import Page from './Page';

const generatePage = totalSize => ({ key, page, width }) => (
  <Page
    key={key}
    width={(width / totalSize) * 100}
    alt="comic page"
    src={page}
  />
);
const generatePages = ({ pages }) => {
  let totalSize = 0;
  pages.forEach(({ width }) => {
    totalSize += width;
  });
  return pages.map(generatePage(totalSize));
};

generatePages.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any,
      page: PropTypes.string,
      width: PropTypes.number
    })
  )
};

generatePages.defaultProps = {
  pages: []
};

export default generatePages;
