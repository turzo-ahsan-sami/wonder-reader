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

import * as actions from '../actions';
import * as store from '../store';
import openAdjacentComic from '../modules/openAdjacentComic';

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
      pageCount: store.page.getPageCount()
    };
  }

  componentDidMount() {
    store.page.on('change', this.setPageCount);
  }

  componentWillUnmount() {
    store.page.removeListener('change', this.setPageCount);
  }

  setPageCount = () => {
    this.setState({
      pageCount: store.page.getPageCount()
    });
  };

  renderChangePageCount = func => {
    const { pageCount } = this.state;
    return pageCount === 1
      ? <ButtonChangePageCountSingle onClick={func} />
      : <ButtonChangePageCountDouble onClick={func} />;
  };

  render() {
    return (
      <div>
        <ButtonOpenLibrary onClick={actions.top.toggleLibrary} />
        {this.renderChangePageCount(store.page.togglePageCount)}
        <ButtonPrevComic onClick={openPrevComic} />
        <ButtonPageLeft onClick={actions.page.turnPageLeft} />
        <ButtonPageRight onClick={actions.page.turnPageRight} />
        <ButtonNextComic onClick={openNextComic} />
      </div>
    );
  }
}

export default ButtonBar;
