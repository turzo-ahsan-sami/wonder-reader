import DragScroll from 'react-dragscroll';
import React, { useEffect, useState } from 'react';

import Page from '../components/Page';
import * as store from '../store';

const getWidth = page => page.width;
const increaseTotalSize = (accumulator, page) => accumulator + page;

const getValues = () => {
  const {
    marginLeft,
    marginTop,
    ratioX,
    ratioY,
    scrollLeft,
    scrollTop,
    zoomLevel,
  } = store.zoom.getAll();

  const { encodedPages } = store.page.getAll();

  return {
    marginLeft,
    marginTop,
    ratioX,
    ratioY,
    scrollLeft,
    scrollTop,
    zoomLevel,

    encodedPages
  };
};

const PageViewer = () => {
  const [{
    encodedPages,
    marginLeft,
    marginTop,
    ratioX,
    ratioY,
    scrollLeft,
    scrollTop,
    zoomLevel,
  }, setState] = useState(getValues());

  const areThereEncodedPages = Array.isArray(encodedPages) && encodedPages.length > 0;

  const totalSize = encodedPages
    .map(getWidth)
    .reduce(increaseTotalSize, 0);

  const renderPage = (item) => (
    <Page
      key={item.key}
      alt="comic page"
      id={item.key}
      src={item.page}
      width={(item.width / totalSize) * 100}
    />
  );

  const updateState = () => {
    setState(getValues());
  };

  useEffect(() => {
    return () => {
      const pageViewer = document.querySelector('.PageViewer');
      if (areThereEncodedPages) {
        pageViewer.scrollLeft = 0;
        pageViewer.scrollTop = 0;
        // this.setRatio();
      }
    };
  });

  return (
    <DragScroll className="dragscroll PageViewer">
      <div
        className="pages"
        style={{
          marginLeft,
          marginTop,
          height: `${zoomLevel}%`,
          width: `${zoomLevel}%`,
        }}
      >
        {areThereEncodedPages && encodedPages.map(renderPage)}
      </div>
    </DragScroll>
  );
};


export default PageViewer;
