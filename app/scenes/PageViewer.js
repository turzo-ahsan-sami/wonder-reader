import React, { Component } from 'react';
import DragScroll from 'react-dragscroll';

import Page from '../components/Page';
import zoomStore from '../store/ZoomStore';
import pageStore from '../store/PageStore';

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

  componentDidMount() {

  }

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
    } = zoomStore.getAll();

    const {encodedPages} = pageStore.getAll();

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
        alt="comic page"
        id={item.key}
        key={item.key}
        width={(item.width / totalSize) * 100}
        src={item.page}
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
    console.log('PageViewer:', this.state);
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
