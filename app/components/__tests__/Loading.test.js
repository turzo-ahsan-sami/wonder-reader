import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import { Loading } from '../Loading';

Enzyme.configure({ adapter: new Adapter() });

describe('Loading', () => {
  it('should render', () => {
    const props = {
      classes: {
        root: 'sampleRoot',
        progress: 'sampleProgress',
      },
      isLoading: true,
    };
    const wrapper = shallow(<Loading {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
