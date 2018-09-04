const openedComicPrototype = {
  name: null,
  basename: '',
  tempdir: '',
  extname: '',
  origin: '',

  pending: 0,
  error: false,
  errorMessage: '',
  stat: ''
};

export default {
  openedComic: openedComicPrototype,
  pages: [],
  encodedPages: [],

  // Page Data for Main => PageViewer => Page
  centerfolds: [],
  currentPageIndex: '',
  pageCount: 2,

  // Errors
  error: false,
  errorMessage: '',

  // Material UI Drawer data
  top: false,
  // options: false,

  // Contents data for Library
  content: {},

  // Zoom data for PageViewer
  zoomLevel: 100,

  // bool to display loading screen
  isLoading: false,

  // Image cache
  images: []
};
