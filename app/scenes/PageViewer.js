import React, { Component } from 'react';
import DragScroll from 'react-dragscroll';
import PropTypes from 'prop-types';

import Page from '../components/Page';

const getWidth = page => page.width;
const increaseTotalSize = (accumulator, page) => accumulator + page;

class PageViewer extends Component {
  state = {
    marginLeft: 0,
    marginTop: 0,
    scrollLeft: 0,
    scrollTop: 0
  };

  componentDidUpdate() {
    const pageViewer = document.querySelector('.PageViewer');
    if (this.areTherePageProps()) {
      pageViewer.scrollLeft = 0;
      pageViewer.scrollTop = 0;
      this.setRatio();
    }
  }

  getPageViewer = () => document.querySelector('.PageViewer');
  getPageWrapper = () => document.getElementById('pageWrapper');

  getMargins = () => {
    const pageViewer = this.getPageViewer();
    const pageWrapper = this.getPageWrapper();
    const { zoomLevel } = this.props;

    // Center Points X || Y
    const cPX = pageViewer.scrollLeft + pageViewer.clientWidth / 2;
    const cPY = pageViewer.scrollTop + pageViewer.clientHeight / 2;

    // Position Ratios to whole
    const ratioX = cPX / pageWrapper.clientWidth;
    const ratioY = cPY / pageWrapper.clientHeight;

    const marginLeft = zoomLevel < 100 ? `${(100 - zoomLevel) / 2}%` : 0;
    const marginTop =
      pageViewer.clientHeight > pageWrapper.clientHeight
        ? `${(pageViewer.clientHeight - pageWrapper.clientHeight) / 2}px`
        : 0;

    const scrollLeft =
      pageWrapper.clientWidth * ratioY - pageViewer.clientWidth / 2;
    const scrollTop =
      pageWrapper.clientHeight * ratioX - pageViewer.clientHeight / 2;

    return {
      marginLeft,
      marginTop,
      ratioX,
      ratioY,
      scrollLeft,
      scrollTop
    };
  };

  setRatio = () => {
    const { marginLeft, marginTop, scrollLeft, scrollTop } = this.getMargins();

    this.setState({
      marginLeft,
      marginTop,
      scrollLeft,
      scrollTop
    });
  };

  getPageViewerStyle = () => {
    const { marginLeft, marginTop } = this.state;
    const { zoomLevel } = this.props;
    const zoom = `${zoomLevel}%`;

    return {
      marginLeft,
      marginTop,
      height: zoom,
      width: zoom
    };
  };
  areTherePageProps = () => {
    const { encodedPages } = this.props;
    return Array.isArray(encodedPages) && encodedPages.length > 0;
  };

  applyScrolling = () => {
    const pageViewer = this.getPageViewer();
    const { scrollLeft, scrollTop } = this.state;
    pageViewer.scrollLeft = scrollLeft;
    pageViewer.scrollTop = scrollTop;
  };

  renderPage = (item, totalSize) => (
    <Page
      alt="comic page"
      id={item.key}
      key={item.key}
      width={(item.width / totalSize) * 100}
      src={item.page}
    />
  );

  renderPages = () => {
    const { encodedPages } = this.props;

    const totalSize = encodedPages.map(getWidth).reduce(increaseTotalSize, 0);

    return this.areTherePageProps()
      ? encodedPages.map(item => this.renderPage(item, totalSize))
      : null;
  };

  renderPageViewer = () => {
    const newPages = this.renderPages();
    const style = this.getPageViewerStyle();

    return (
      <div className="pages" style={style}>
        {newPages}
      </div>
    );
  };

  render() {
    console.log('PageViewer:', this.props);
    return (
      <DragScroll className="PageViewer dragscroll">
        {this.renderPageViewer()}
      </DragScroll>
    );
  }
}

PageViewer.propTypes = {
  encodedPages: PropTypes.array,
  zoomLevel: PropTypes.number.isRequired
};

PageViewer.defaultProps = {
  encodedPages: []
};

export default PageViewer;
