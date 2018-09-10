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

  openNextComic = () => {
    const polarity = 1;
    openAdjacentComic(polarity);
  };

  openPrevComic = () => {
    const polarity = -1;
    openAdjacentComic(polarity);
  };

  renderChangePageCount = func => (
    this.state.pageCount === 1
      ? <ButtonChangePageCountSingle onClick={func} />
      : <ButtonChangePageCountDouble onClick={func} />
  )

  render() {
    return (
      <div>
        <ButtonOpenLibrary onClick={TopActions.openLibrary} />
        {this.renderChangePageCount(PageStore.togglePageCount)}
        <ButtonPrevComic onClick={this.openPrevComic} />
        <ButtonPageLeft onClick={PageActions.turnPageLeft} />
        <ButtonPageRight onClick={PageActions.turnPageRight} />
        <ButtonNextComic onClick={this.openNextComic} />
      </div>
    );
  }
}

export default ButtonBar;
