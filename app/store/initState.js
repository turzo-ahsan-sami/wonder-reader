import OpenedComicStore from './OpenedComicStore';

export default {
  openedComic: OpenedComicStore.getAll(),
  pages: [],
  encodedPages: [],

  // Page Data for Main => PageViewer => Page
  centerfolds: [],
  currentPageIndex: '',
  pageCount: 2,

  // Errors
  error: false,
  errorMessage: '',

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
