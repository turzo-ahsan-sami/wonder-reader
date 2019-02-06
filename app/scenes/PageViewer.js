import DragScroll from 'react-dragscroll';
import React, { Component } from 'react';

import Page from '../components/Page';
import * as store from '../store';

const getWidth = page => page.width;
const increaseTotalSize = (accumulator, page) => accumulator + page;

class PageViewer extends Component {
  state = {
    marginLeft: null,
    marginTop: null,
    ratioX: null,
    ratioY: null,
    scrollLeft: null,
    scrollTop: null,
    zoomLevel: 100,

    encodedPages: [],
  };

  componentDidMount() {}

  componentDidUpdate() {
    const pageViewer = document.querySelector('.PageViewer');
    if (this.areTherePageProps()) {
      pageViewer.scrollLeft = 0;
      pageViewer.scrollTop = 0;
      this.setRatio();
    }
  }

  setStates = () => {
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

    this.setState({
      marginLeft,
      marginTop,
      ratioX,
      ratioY,
      scrollLeft,
      scrollTop,
      zoomLevel,

      encodedPages
    });
  };

  setEncodedPageState = () => {
    const encodedPages = store.page.getEncodedPages();
    this.setState({encodedPages});
  };

  getStyles = () => {
    const { marginLeft, marginTop, zoomLevel } = this.state;
    const zoom = `${zoomLevel}%`;

    return {
      marginLeft,
      marginTop,
      height: zoom,
      width: zoom
    };
  };

  areTherePageProps = () => {
    const { encodedPages } = this.state;
    return Array.isArray(encodedPages) && encodedPages.length > 0;
  };

  applyScrolling = () => {
    const pageViewer = this.getPageViewer();
    const { scrollLeft, scrollTop } = this.state;
    pageViewer.scrollLeft = scrollLeft;
    pageViewer.scrollTop = scrollTop;
  };

  renderPage = (totalSize) => (
    (item) => (
      <Page
        key={item.key}
        alt="comic page"
        id={item.key}
        src={item.page}
        width={(item.width / totalSize) * 100}
      />
    )
  );

  renderPages = () => {
    const { encodedPages } = this.state;

    const totalSize = encodedPages
      .map(getWidth)
      .reduce(increaseTotalSize, 0);
    const renderPage = this.renderPage(totalSize);

    return this.areTherePageProps()
      ? encodedPages.map(renderPage)
      : null;
  };

  render() {
    return (
      <DragScroll className="PageViewer dragscroll">
        <div className="pages" style={this.getStyles()}>
          {this.renderPages()}
        </div>
      </DragScroll>
    );
  }
}

export default PageViewer;
