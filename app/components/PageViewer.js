import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Page from './Page';

const style = {
  backgroundColor: '#d8d8d8',
  height: 'calc(100vh - 64px)',
  marginTop: '64px',
  overflow: 'auto',
  width: '100vw'
};

class PageViewer extends Component {
  state = {
    currentComicPage: null,
    currentZoomLevel: 100,
    marginLeft: 0,
    marginTop: 0,
  }

  componentDidUpdate() {
    const P = this.props;
    const S = this.state;
    const pageViewer = document.getElementById('pageViewer');
    const pageWrapper = document.getElementById('pageWrapper');

    if (P.encodedPages) {
      if (S.currentComicPage !== P.encodedPages[0].page) {
        pageViewer.scrollLeft = 0;
        pageViewer.scrollTop = 0;
        this.setState({currentComicPage: P.encodedPages[0].page});
      } else if (P.zoomLevel >= 100
        &&  S.currentZoomLevel !== P.zoomLevel) {
        // Center Points X || Y
        const cPX = pageViewer.scrollLeft + pageViewer.clientWidth / 2;
        const cPY = pageViewer.scrollTop + pageViewer.clientHeight / 2;

        // Position Ratios to whole
        const cPXR = cPX / pageWrapper.clientWidth;
        const cPYR = cPY / pageWrapper.clientHeight;

        const marginLeft = P.zoomLevel < 100
          ? `${ (100 - P.zoomLevel) / 2 }%`
          : 0;
        const marginTop = pageViewer.clientHeight > pageWrapper.clientHeight
          ? `${ (pageViewer.clientHeight - pageWrapper.clientHeight) / 2}px`
          : 0;

        pageViewer.scrollTop = pageWrapper.clientHeight * cPXR - pageViewer.clientHeight / 2;
        pageViewer.scrollLeft = pageWrapper.clientWidth * cPYR - pageViewer.clientWidth / 2;

        this.setState({
          currentZoomLevel: P.zoomLevel,
          marginLeft,
          marginTop
        });
      }
    }
  }

  render() {
    const {pages} = this.props;
    const areThereEncodedPages = pages && pages.length > 0;
    let totalSize = 0;
    let newPages = null

    if (areThereEncodedPages) {
      for (const page of pages) {totalSize += page.width;}
      console.log(totalSize);
      newPages = pages.map((page) => {
        console.log('totalSize', totalSize, ':: page.width', page.width);
        return (
          <Page
            key={page.key}
            width={(page.width / totalSize) * 100}
            alt="comic page"
            src={page.encodedPagePath}
          />
        );
      });
    }

    return (
      <div
        className='PageViewer dragscroll'
        id='pageViewer'
        style={style}
      >
        <div
          className='pages'
          id='pageWrapper'
          style={{
            height: `${this.props.zoomLevel}%`,
            marginLeft: this.state.marginLeft,
            marginTop: this.state.marginTop,
            width: `${this.props.zoomLevel}%`}}
        >
          {newPages}
        </div>
      </div>
    );
  }
}

PageViewer.defaultProps = {
  pages: []
};

PageViewer.propTypes = {
  pages: PropTypes.array,
  zoomLevel: PropTypes.number.isRequired
}

export default PageViewer;