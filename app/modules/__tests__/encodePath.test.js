// import encodePath, { encodeUnix, encodeWin } from '../encodePath';
import { encodeUnix, encodeWin } from '../encodePath';

describe('encodePath', () => {
  it('encodeUnix', () => {
    const filepath = '/home/sample user/wonder-reader';
    expect(encodeUnix(filepath)).toBe('/home/sample%20user/wonder-reader');
  });
  it('encodeWin', () => {
    const filepath = 'c:/sample user/file/abc.cbr';
    expect(encodeWin(filepath)).toBe('c:/sample%20user/file/abc.cbr');
  });

  // describe('OS Operations', () => {
  //   it('should format the string for Unix', () => {
  //     jest.mock('os', () => ({
  //       _esModule: true,
  //       platform: () => 'darwin',
  //     }));
  //     const filepath = '/home/sample user/wonder-reader';
  //     expect(encodePath(filepath)).toBe('/home/sample%20user/wonder-reader');
  //     jest.resetAllMocks();
  //   })
  //
  //   it('should format the string for Windows', () => {
  //     jest.mock('os', () => ({
  //       _esModule: true,
  //       platform: () => 'win32',
  //     }));
  //     const filepath = 'c:/sample user/file/abc.cbr';
  //     expect(encodePath(filepath)).toBe('c:/sample%20user/file/abc.cbr');
  //     jest.resetAllMocks();
  //   })
  // })
});
