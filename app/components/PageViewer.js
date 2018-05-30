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
    // currentComicPage: null,
    // currentZoomLevel: 100,
    marginLeft: 0,
    marginTop: 0,
  }

  // componentDidUpdate() {
  //   const P = this.props;
  //   const S = this.state;
  //   const pageViewer = document.getElementById('pageViewer');
  //   const pageWrapper = document.getElementById('pageWrapper');
  //
  //   if (P.encodedPages) {
  //     if (S.currentComicPage !== P.encodedPages[0].page) {
  //       pageViewer.scrollLeft = 0;
  //       pageViewer.scrollTop = 0;
  //       this.setState({currentComicPage: P.encodedPages[0].page}); // eslint-disable-line
  //     } else if (P.zoomLevel >= 100
  //       &&  S.currentZoomLevel !== P.zoomLevel) {
  //       // Center Points X || Y
  //       const cPX = pageViewer.scrollLeft + pageViewer.clientWidth / 2;
  //       const cPY = pageViewer.scrollTop + pageViewer.clientHeight / 2;
  //
  //       // Position Ratios to whole
  //       const cPXR = cPX / pageWrapper.clientWidth;
  //       const cPYR = cPY / pageWrapper.clientHeight;
  //
  //       const marginLeft = P.zoomLevel < 100
  //         ? `${ (100 - P.zoomLevel) / 2 }%`
  //         : 0;
  //       const marginTop = pageViewer.clientHeight > pageWrapper.clientHeight
  //         ? `${ (pageViewer.clientHeight - pageWrapper.clientHeight) / 2}px`
  //         : 0;
  //
  //       pageViewer.scrollTop = pageWrapper.clientHeight * cPXR - pageViewer.clientHeight / 2;
  //       pageViewer.scrollLeft = pageWrapper.clientWidth * cPYR - pageViewer.clientWidth / 2;
  //
  //       this.setState({ // eslint-disable-line
  //         currentZoomLevel: P.zoomLevel,
  //         marginLeft,
  //         marginTop
  //       });
  //     }
  //   }
  // }

  render() {
    console.log('PageViewer:', this.props);
    let totalSize = 0;
    let newPages = null

    if (this.props.comic.name !== null && this.prop.pages && this.props.pages.length > 0) {
      for (let i = 0; i < this.props.pageCount; i++) { // eslint-disable-line
          totalSize += this.props.pages[i].width;
      }
      console.log(totalSize);
      newPages = this.props.pages.map((page) => {
        console.log('totalSize', totalSize, ':: page.width', page.width);
        return (
          <Page
            key={page.key}
            width={(page.width / totalSize) * 100}
            alt="comic page"
            src={page.page}
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
            marginLeft: this.state.marginLeft,
            marginTop: this.state.marginTop,
            height: `${this.props.zoomLevel}%`,
            width: `${this.props.zoomLevel}%`}}
        >
          {newPages}
        </div>
      </div>
    );
  }
}

PageViewer.propTypes = {
  comic: PropTypes.object.isRequired, // eslint-disable-line
  pageCount: PropTypes.number.isRequired,
  pages: PropTypes.array, // eslint-disable-line
  zoomLevel: PropTypes.number.isRequired
}

export default PageViewer;
