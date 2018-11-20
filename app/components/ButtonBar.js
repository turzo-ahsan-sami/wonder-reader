import React, {Component} from 'react';

import {
  ButtonChangePageCountDouble,
  ButtonChangePageCountSingle,
  ButtonNextComic,
  ButtonOpenLibrary,
  ButtonPageLeft,
  ButtonPageRight,
  ButtonPrevComic
} from './Buttons';

import * as PageActions from '../actions/pageActions';
import * as TopActions from '../actions/topActions';
import openAdjacentComic from '../modules/openAdjacentComic';
import PageStore from '../store/PageStore';

const openNextComic = () => {
  const polarity = 1;
  openAdjacentComic(polarity);
};

const openPrevComic = () => {
  const polarity = -1;
  openAdjacentComic(polarity);
};

class ButtonBar extends Component {
  constructor() {
    super();
    this.state = {
      pageCount: PageStore.getPageCount()
    };
  }

  componentDidMount() {
    PageStore.on('change', this.setPageCount);
  }

  componentWillUnmount() {
    PageStore.removeListener('change', this.setPageCount);
  }

  setPageCount() {
    this.setState({
      pageCount: PageStore.getPageCount()
    });
  }

  renderChangePageCount = func => {
    const {pageCount} = this.state;
    return pageCount === 1
      ? <ButtonChangePageCountSingle onClick={func} />
      : <ButtonChangePageCountDouble onClick={func} />;
  }

  render() {
    return (
      <div>
        <ButtonOpenLibrary onClick={TopActions.openLibrary} />
        {this.renderChangePageCount(PageStore.togglePageCount)}
        <ButtonPrevComic onClick={openPrevComic} />
        <ButtonPageLeft onClick={PageActions.turnPageLeft} />
        <ButtonPageRight onClick={PageActions.turnPageRight} />
        <ButtonNextComic onClick={openNextComic} />
      </div>
    );
  }
}

export default ButtonBar;
