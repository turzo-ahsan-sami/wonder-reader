// Page turning engine 2.0

const turnPage = (currentPageIndex, centerfolds, pageCount, pagesLength, polarity, cb) => {
  // centerfolds for singlePaging ( [2, 5, 11]  )
  // currentPageIndex for currentPage, which will make a new var newPageIndex ( Num )
  // pageCount for number of pages turned ( 2 || 1 )
  // pagesLength for full comic scope ( 18 )
  // polarity for left or right ( 1 || -1 )

  function isCenterfold(index) {
    return centerfolds.includes(index);
  }

  let newPageIndex = null;
  let pagesToDisplay = null;

  // For the Last Page
  // 17 + 2 > 18
  if (currentPageIndex + (pageCount * polarity) >= pagesLength - 1) {
    newPageIndex = pagesLength - 1;
    pagesToDisplay = 1;
    console.log('newPageIndex', newPageIndex);
    console.log('pagesToDisplay', pagesToDisplay);
    // For the First Page
    // 1 - 2 < 0 || Index 0 might be a CenterFold
  } else if (currentPageIndex + (pageCount * polarity) < 0 ) {
    newPageIndex = 0;
    pagesToDisplay = isCenterfold(0) || isCenterfold(1) ? 1 : 2;
    console.log('newPageIndex', newPageIndex);
    console.log('pagesToDisplay', pagesToDisplay);
    // All other cases, with centerfolds applied
  } else {
    // If settings only allow a singlePage, and catches all such cases
    if (pageCount === 1) {
      newPageIndex = currentPageIndex + polarity;
      pagesToDisplay = 1;
      console.log('newPageIndex', newPageIndex);
      console.log('pagesToDisplay', pagesToDisplay);
      // Turning 2 pages at a time, and figuring out displays
    } else {
      // To determine right page turns
      if (polarity > 0) {
        // Checks if currentPage is centerfold, and jumps over 1 pageIndex
        if (isCenterfold(currentPageIndex)) {
          newPageIndex = currentPageIndex + 1;
          pagesToDisplay = isCenterfold(newPageIndex) ? 1 : 2;
          console.log('newPageIndex', newPageIndex);
          console.log('pagesToDisplay', pagesToDisplay);
          // Checks if the next few pages might be centerfolds
        } else if ( isCenterfold(currentPageIndex + 1)
        || isCenterfold(currentPageIndex + 2)
        || isCenterfold(currentPageIndex + 3)) {
          newPageIndex = currentPageIndex + 1;
          pagesToDisplay = 1;
          console.log('newPageIndex', newPageIndex);
          console.log('pagesToDisplay', pagesToDisplay);
          // No upcoming centerfolds and you're displaying 2 pages!
          // You're in the clear, toots!
        } else {
          newPageIndex = currentPageIndex + 2;
          pagesToDisplay = 2;
          console.log('newPageIndex', newPageIndex);
          console.log('pagesToDisplay', pagesToDisplay);
        }
        // Here we are going left instead, and into negatives
      } else {
        // If you're currently on a centerfold, it doesn't matter with the previous pages.
        // If those preceeding pages were centerfolds, this is where it is figured out
        if (isCenterfold(currentPageIndex - 1)
        || isCenterfold(currentPageIndex - 2)) {
          newPageIndex = currentPageIndex - 1;
          pagesToDisplay = 1;
          console.log('newPageIndex', newPageIndex);
          console.log('pagesToDisplay', pagesToDisplay);
          // That should take care of any upcoming centerfolds
          // Just sub that num from that i
        } else {
          newPageIndex = currentPageIndex - 2;
          pagesToDisplay = 2;
          console.log('newPageIndex', newPageIndex);
          console.log('pagesToDisplay', pagesToDisplay);
        }
      }
    }
  }

  // one last check if a single edge case with ( 2 === pagesToDisplay ) with a single page view;
  pagesToDisplay = Math.min(pagesToDisplay, pageCount);
  console.log('pagesToDisplay:', pagesToDisplay);
  console.log('pageCount:', pageCount);
  cb(newPageIndex, pagesToDisplay);
};

export default turnPage;
