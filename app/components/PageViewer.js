import React, { Component } from 'react';
import DragScroll from 'react-dragscroll';
import PropTypes from 'prop-types';

import Page from './Page';

// const style = {
//   backgroundColor: '#d8d8d8',
//   height: 'calc(100vh - 64px)',
//   marginTop: '64px',
//   overflow: 'auto',
//   width: '100vw'
// };

class PageViewer extends Component {
  state = {
    // currentComicPage: null,
    // currentZoomLevel: 100,
    marginLeft: 0,
    marginTop: 0
  };

  componentDidUpdate() {
    const P = this.props;
    const S = this.state;
    const pageViewer = document.querySelector('.PageViewer');
    // const pageWrapper = document.getElementById('pageWrapper');

    if (this.areTherePageProps()) {
      if (S.currentComicPage !== P.pages[0].page) {
        pageViewer.scrollLeft = 0;
        pageViewer.scrollTop = 0;
        this.setState({ currentComicPage: P.pages[0].page }); // eslint-disable-line
        // } else if (P.zoomLevel >= 100 && S.currentZoomLevel !== P.zoomLevel) {
        //   // Center Points X || Y
        //   const cPX = pageViewer.scrollLeft + pageViewer.clientWidth / 2;
        //   const cPY = pageViewer.scrollTop + pageViewer.clientHeight / 2;
        //
        //   // Position Ratios to whole
        //   const cPXR = cPX / pageWrapper.clientWidth;
        //   const cPYR = cPY / pageWrapper.clientHeight;
        //
        //   const marginLeft =
        //     P.zoomLevel < 100 ? `${(100 - P.zoomLevel) / 2}%` : 0;
        //   const marginTop =
        //     pageViewer.clientHeight > pageWrapper.clientHeight
        //       ? `${(pageViewer.clientHeight - pageWrapper.clientHeight) / 2}px`
        //       : 0;
        //
        //   pageViewer.scrollTop =
        //     pageWrapper.clientHeight * cPXR - pageViewer.clientHeight / 2;
        //   pageViewer.scrollLeft =
        //     pageWrapper.clientWidth * cPYR - pageViewer.clientWidth / 2;
        //
        //   this.setState({
        //     // eslint-disable-line
        //     currentZoomLevel: P.zoomLevel,
        //     marginLeft,
        //     marginTop
        //   });
      }
    }
  }

  areTherePageProps = () =>
    Array.isArray(this.props.pages) && this.props.pages.length > 0;

  render() {
    console.log('PageViewer:', this.props);
    let totalSize = 0;
    let newPages = null;

    if (this.areTherePageProps()) {
      this.props.pages.forEach(page => {
        totalSize += page.width;
      });
      newPages = this.props.pages.map(page => (
        <Page
          key={page.key}
          width={(page.width / totalSize) * 100}
          alt="comic page"
          src={page.page}
        />
      ));
    }

    return (
      <DragScroll className="PageViewer dragscroll">
        <div
          className="pages"
          style={{
            marginLeft: this.state.marginLeft,
            marginTop: this.state.marginTop,
            height: `${this.props.zoomLevel}%`,
            width: `${this.props.zoomLevel}%`
          }}
        >
          {newPages}
        </div>
      </DragScroll>
    );
  }
}

PageViewer.propTypes = {
  comic: PropTypes.object.isRequired, // eslint-disable-line
  pages: PropTypes.array, // eslint-disable-line
  zoomLevel: PropTypes.number.isRequired
};

export default PageViewer;
