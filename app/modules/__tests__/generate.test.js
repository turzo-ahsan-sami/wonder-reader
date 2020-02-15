import path from 'path';

import {
  // generateCenterfolds,
  generateContent,
  generateContents,
  generateNestedContentFromFilepath,
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

  describe('generateContents', () => {
    const sampleDirectory = path.join(__dirname, 'sampleFiles');
    const sampleFullpath = path.join(sampleDirectory, 'sample.txt.cbz');
    const encodedSampleFullpath = encodeURIComponent(sampleFullpath);

    it('should generate content from __dirname/sampleFiles', (done) => {
      const content = generateContent(sampleDirectory);
      generateContents(content, (err, contents) => {
        expect(err).toBe(null);
        expect(contents).toEqual([
          {
            basename: 'sample.txt.cbz',
            bookmark: 0,
            contents: [],
            dirname: sampleDirectory,
            extname: '.cbz',
            fullpath: sampleFullpath,
            id: encodedSampleFullpath,
            isDirectory: false,
          },
        ]);
        done();
      });
    });
  });

  describe('generateNestedContentFromFilepath', () => {
    it('should generate content', (done) => {
      generateNestedContentFromFilepath(__dirname, (content) => {
        expect(content).toEqual({
          basename: '__tests__',
          bookmark: NaN,
          contents: [],
          dirname: path.dirname(__dirname),
          extname: '',
          fullpath: __dirname,
          id: encodeURIComponent(__dirname),
          isDirectory: true,
        });
        done();
      });
    });
  });
});
