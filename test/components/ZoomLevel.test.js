import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import ZoomLevel from '../../app/components/ZoomLevel';

Enzyme.configure({ adapter: new Adapter() });

describe('ZoomLevel', () => {
  it('should render', () => {
    const wrapper = shallow(<ZoomLevel value={100} />);
    expect(wrapper).toMatchSnapshot();
  });
});
