// Page turning engine 2.0

const areThereUpcomingIncludes = ARRAY => index => (
  ARRAY.includes(index) || ARRAY.includes(index + 1)
);

const determineProperBool = ({
  currentPageIndex,
  centerfolds,
  pageCount,
  pagesLength,
  polarity
}) => {
  const areThereUpcomingCenterfolds = areThereUpcomingIncludes(centerfolds);

  return {
    areTherePrecedingCenterfoldsInAFewPages: areThereUpcomingCenterfolds(currentPageIndex - 2),
    areThereUpcomingCenterfolds,
    areThereUpcomingCenterfoldsInAFewPages: areThereUpcomingCenterfolds(currentPageIndex + 2),
    isCurrentPageACenterfold: centerfolds.includes(currentPageIndex),
    isNextPageACenterfold: centerfolds.includes(currentPageIndex + 1),
    positivePolarity: polarity > 0,
    singlePageView: pageCount === 1,
    wouldLoadFirstPage: currentPageIndex + pageCount * polarity < 0,
    wouldLoadLastPage: currentPageIndex + pageCount * polarity >= pagesLength - 1,
  };
};

const determinePositivePolarityValue = ({
  currentPageIndex,
  centerfolds,
  pageCount,
  pagesLength,
  polarity
}) => {
  const {
    areThereUpcomingCenterfolds,
    areThereUpcomingCenterfoldsInAFewPages,
    isCurrentPageACenterfold,
    isNextPageACenterfold
  } = determineProperBool({
    currentPageIndex,
    centerfolds,
    pageCount,
    pagesLength,
    polarity
  });

  let newPageIndex, pagesToDisplay;

  if (isCurrentPageACenterfold) {
    const value = areThereUpcomingCenterfolds(currentPageIndex + 1) ? 1 : 2;
    [newPageIndex, pagesToDisplay] = [currentPageIndex + 1, value];
  } else if (isNextPageACenterfold) {
    [newPageIndex, pagesToDisplay] = [currentPageIndex + 1, 1];
  } else if (areThereUpcomingCenterfoldsInAFewPages) {
    [newPageIndex, pagesToDisplay] = [currentPageIndex + 2, 1];
  } else {
    [newPageIndex, pagesToDisplay] = [currentPageIndex + 2, 2];
  }
  return [newPageIndex, pagesToDisplay];
};

const turnPage = (
  currentPageIndex,
  centerfolds,
  pageCount,
  pagesLength,
  polarity,
  cb
) => {
  const batch = {
    currentPageIndex,
    centerfolds,
    pageCount,
    pagesLength,
    polarity
  };
  const {
    areTherePrecedingCenterfoldsInAFewPages,
    areThereUpcomingCenterfolds,
    positivePolarity,
    singlePageView,
    wouldLoadFirstPage,
    wouldLoadLastPage
  } = determineProperBool(batch);

  let newPageIndex, pagesToDisplay;

  if (wouldLoadLastPage) {
    [newPageIndex, pagesToDisplay] = [pagesLength - 1, 1];
  } else if (wouldLoadFirstPage) {
    const value = areThereUpcomingCenterfolds(0) ? 1 : 2;
    [newPageIndex, pagesToDisplay] = [0, value];
  } else if (singlePageView) {
    [newPageIndex, pagesToDisplay] = [currentPageIndex + polarity, 1];
  } else if (positivePolarity) {
    [newPageIndex, pagesToDisplay] = determinePositivePolarityValue(batch);
  } else if (areTherePrecedingCenterfoldsInAFewPages) {
    [newPageIndex, pagesToDisplay] = [currentPageIndex - 1, 1];
  } else {
    [newPageIndex, pagesToDisplay] = [currentPageIndex - 2, 2];
  }
  cb(newPageIndex, pagesToDisplay);
};

export default turnPage;
