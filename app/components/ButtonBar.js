import React, {useEffect, useState} from 'react';

import * as Button from './Buttons';

import * as actions from '../actions';
import * as store from '../store';
import openAdjacentComic from '../modules/openAdjacentComic';

const openComic = polarity => () => {
  openAdjacentComic(polarity);
};

const ButtonBar = () => {
  const [pageCount, setPageCount] = useState(store.page.getPageCount());

  const updatePageCount = () => {
    setPageCount(store.page.getPageCount());
  };

  useEffect(() => {
    store.page.on('change', updatePageCount);
    return store.page.removeListener('change', updatePageCount);
  });

  return (
    <div>
      <Button.OpenLibrary onClick={actions.top.toggleLibrary} />
      <Button.Toggle bool={pageCount === 1} onClick={store.page.togglePageCount} />
      <Button.PrevComic onClick={openComic(-1)} />
      <Button.PageLeft onClick={actions.page.turnPageLeft} />
      <Button.PageRight onClick={actions.page.turnPageRight} />
      <Button.NextComic onClick={openComic(1)} />
    </div>
  );
};

export default ButtonBar;
