import * as strain from '../../app/modules/strain';

describe('strain.js', () => {
  it('isComic', () => {
    const { isComic } = strain;
    const testFilenames = {
      cbr: 'test.cbr',
      cbz: 'test.cbz',
      pdf: 'test.pdf'
    };
    expect(isComic(testFilenames.cbr)).toBe(true);
    expect(isComic(testFilenames.cbz)).toBe(true);
    expect(isComic(testFilenames.pdf)).toBe(false);
  });

  it('isImage', () => {
    const { isImage } = strain;

    const testFilenames = {
      jpg: 'test.jpg',
      jpeg: 'test.jpeg',
      png: 'test.png',
      gif: 'test.gif',
      bmp: 'test.bmp',
      webp: 'test.webp',
      doc: 'test.doc'
    };

    expect(isImage(testFilenames.jpg)).toBe(true);
    expect(isImage(testFilenames.jpeg)).toBe(true);
    expect(isImage(testFilenames.png)).toBe(true);
    expect(isImage(testFilenames.gif)).toBe(true);
    expect(isImage(testFilenames.bmp)).toBe(true);
    expect(isImage(testFilenames.webp)).toBe(true);
    expect(isImage(testFilenames.doc)).toBe(false);
  });

  it('sortArrayByAlpha', () => {
    const { sortArrayByAlpha } = strain;
    const testArray = ['abc01.png', 'abc05.png', 'abc03.png', 'abc3.png'];
    const expected = ['abc01.png', 'abc03.png', 'abc05.png', 'abc3.png'];

    expect(sortArrayByAlpha(testArray)).toEqual(expected);
  });
});
