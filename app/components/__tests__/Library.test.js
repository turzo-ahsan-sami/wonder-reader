import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import { Library } from '../Library';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  classes: { list: 'classes.list' },
  closeDrawer: jest.fn(),
  loadedLibrary: './',
  open: true,
  openComic: jest.fn(),
  saveContentDataToMain: jest.fn(),
  style: {},
};

describe('Library', () => {
  it('should render', () => {
    const wrapper = shallow(<Library {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
