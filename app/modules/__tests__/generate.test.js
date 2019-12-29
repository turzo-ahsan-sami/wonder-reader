import path from 'path';

import {
  // generateCenterfolds,
  generateContent,
  // generateContents,
  // generateNestedContentFromFilepath
} from '../generate';

describe('generate', () => {
  describe('generateContent', () => {
    it('returns as expected for file', () => {
      expect(generateContent(__filename)).toEqual({
        basename: 'generate.test.js',
        bookmark: 0,
        contents: [],
        dirname: __dirname,
        extname: '.js',
        fullpath: __filename,
        id: encodeURIComponent(__filename),
        isDirectory: false,
      });
    });

    it('returns as expected for directory', () => {
      expect(generateContent(__dirname)).toEqual({
        basename: '__tests__',
        bookmark: NaN,
        contents: [],
        dirname: path.dirname(__dirname),
        extname: '',
        fullpath: __dirname,
        id: encodeURIComponent(__dirname),
        isDirectory: true,
      });
    });
  });
});
