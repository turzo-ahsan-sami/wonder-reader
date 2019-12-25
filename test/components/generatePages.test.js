import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import GeneratePages, {
  generatePage,
  generateTotalSize,
  generateTotalSizeBeta
} from '../../app/components/generatePages';

Enzyme.configure({ adapter: new Adapter() });

const GeneratePage = generatePage(1000);
const props = {
  pages: [
    {
      key: 0,
      page: 'abc.png',
      width: 100
    },
    {
      key: 1,
      page: 'deb.png',
      width: 300
    }
  ]
};
const sampleData = [1, 2, 3, 4, 5].map(n => ({ width: n }));

describe('generatePages', () => {
  it('should render', () => {
    const wrapper = shallow(<GeneratePages pages={props.pages} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('generatePage', () => {
    const wrapper = shallow(<GeneratePage {...props[0]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('generateTotalSize', () => {
    expect(generateTotalSize(sampleData)).toBe(15);
  });

  it('generateTotalSizeBeta', () => {
    expect(generateTotalSizeBeta(sampleData)).toBe(15);
  });
});
