// Page turning engine 2.0

const includes = ARRAY => index => ARRAY.includes(index);

const areThereUpcomingIncludes = ARRAY => index => (
  includes(ARRAY)(index) || includes(ARRAY)(index + 1)
);

const determineProperBool = ({
  currentPageIndex,
  centerfolds,
  pageCount,
  pagesLength,
  polarity
}) => {
  const isCenterfold = includes(centerfolds);
  const areThereUpcomingCenterfolds = areThereUpcomingIncludes(centerfolds);
  const wouldLoadFirstPage = currentPageIndex + pageCount * polarity < 0;
  const wouldLoadLastPage =
    currentPageIndex + pageCount * polarity >= pagesLength - 1;
  const singlePageView = pageCount === 1;
  const positivePolarity = polarity > 0;
  const isCurrentPageACenterfold = isCenterfold(currentPageIndex);
  const isNextPageACenterfold = isCenterfold(currentPageIndex + 1);
  const areThereUpcomingCenterfoldsInAFewPages = areThereUpcomingCenterfolds(
    currentPageIndex + 2
  );
  const areTherePrecedingCenterfoldsInAFewPages = areThereUpcomingCenterfolds(
    currentPageIndex - 2
  );

  return {
    areTherePrecedingCenterfoldsInAFewPages,
    areThereUpcomingCenterfolds,
    areThereUpcomingCenterfoldsInAFewPages,
    isCurrentPageACenterfold,
    isNextPageACenterfold,
    positivePolarity,
    singlePageView,
    wouldLoadFirstPage,
    wouldLoadLastPage
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
