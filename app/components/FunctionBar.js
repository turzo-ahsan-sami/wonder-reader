import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { buttonStyle, buttonTheme } from '../styles/buttonStyle';
import Slider from './Slider';
import {
  ButtonChangePageCountDouble,
  ButtonChangePageCountSingle,
  ButtonNextComic,
  ButtonOpenLibrary,
  ButtonPageLeft,
  ButtonPageRight,
  ButtonPrevComic
} from './Buttons';

const ButtonBar = ({ ButtonFunctions, pageCount }) => {
  const {
    changePageCount,
    openLibrary,
    openNextComic,
    openPrevComic,
    turnPageLeft,
    turnPageRight
  } = ButtonFunctions();

  const renderChangePageCount = func =>
    pageCount === 1 ? (
      <ButtonChangePageCountSingle onClick={func} />
    ) : (
      <ButtonChangePageCountDouble onClick={func} />
    );

  return (
    <div>
      <ButtonOpenLibrary onClick={openLibrary} />
      {renderChangePageCount(changePageCount)}
      <ButtonPrevComic onClick={openPrevComic} />
      <ButtonPageLeft onClick={turnPageLeft} />
      <ButtonPageRight onClick={turnPageRight} />
      <ButtonNextComic onClick={openNextComic} />
    </div>
  );
};

ButtonBar.propTypes = {
  ButtonFunctions: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired
};

const Container = ({ ButtonFunctions, pageCount, setZoomLevel, zoomLevel }) => (
  <div style={buttonStyle}>
    <Slider onChange={setZoomLevel} value={zoomLevel} />
    <ButtonBar ButtonFunctions={ButtonFunctions} pageCount={pageCount} />
  </div>
);

Container.propTypes = {
  ButtonFunctions: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  setZoomLevel: PropTypes.func.isRequired,
  zoomLevel: PropTypes.number.isRequired
};

const FunctionBar = ({
  ButtonFunctions,
  pageCount,
  setZoomLevel,
  zoomLevel
}) => {
  return (
    <MuiThemeProvider theme={buttonTheme}>
      <Container
        ButtonFunctions={ButtonFunctions}
        pageCount={pageCount}
        setZoomLevel={setZoomLevel}
        zoomLevel={zoomLevel}
      />
    </MuiThemeProvider>
  );
};

FunctionBar.propTypes = {
  ButtonFunctions: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  setZoomLevel: PropTypes.func.isRequired,
  zoomLevel: PropTypes.number.isRequired
};

export default FunctionBar;
