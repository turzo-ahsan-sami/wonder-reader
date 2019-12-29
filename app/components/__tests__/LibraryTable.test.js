import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import LibraryTable from '../LibraryTable';

Enzyme.configure({ adapter: new Adapter() });

const generateContents = i => ({
  basename: `basename${i}`,
  dirname: `dirname${i}`,
  id: `id${i}`,
  isDirectory: i % 2 === 0,
});

const contents = [...Array(4).keys()].map(generateContents);

describe('LibraryTable', () => {
  it('should render', () => {
    const props = {
      contents,
      onContentClick: jest.fn(),
    };
    const wrapper = shallow(<LibraryTable {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
