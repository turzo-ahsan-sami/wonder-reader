import PropTypes from 'prop-types';
import React from 'react';

import Page from './Page';

const generateTotalSize = pages => pages.reduce((a, { width }) => a + width, 0);

const generatePages = ({ pages }) => {
  const totalSize = generateTotalSize(pages);
  return pages.map(({ key, page, width }) => (
    <Page
      key={key}
      id={`page${key}`}
      width={(width / totalSize) * 100}
      alt="comic page"
      src={page}
    />
  ));
};

generatePages.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any,
      page: PropTypes.string,
      width: PropTypes.number,
    }),
  ),
};

generatePages.defaultProps = {
  pages: [],
};

export { generateTotalSize };
export default generatePages;
