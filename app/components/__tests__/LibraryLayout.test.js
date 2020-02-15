import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import LibraryLayout from '../LibraryLayout';

const {
  generateNestedContentFromFilepath,
} = require('../../modules/generate.js');

jest.mock('../../modules/generate.js', () => ({
  generateNestedContentFromFilepath: jest.fn(),
}));

Enzyme.configure({ adapter: new Adapter() });

const props = {
  closeLibrary: jest.fn(),
  openComic: jest.fn(),
  root: './',
  saveContentDataToParent: jest.fn(),
  updateRoot: jest.fn(),
};

describe('LibraryLayout', () => {
  it('should render', () => {
    const wrapper = shallow(<LibraryLayout {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should generateNestedContent and set that data to state', () => {
    const wrapper = new LibraryLayout(props);
    wrapper.setContentToState = jest.fn();
    wrapper.updateContent('./');
    expect(generateNestedContentFromFilepath).toHaveBeenCalledWith(
      './',
      wrapper.setContentToState,
    );
  });
});
