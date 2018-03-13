import React from 'react';
import toJSON from 'enzyme-to-json';
import Footer from '../../src/components/Footer';


describe('Footer component', () => {

  it('should render the footer', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('div').length).toEqual(3);
    expect(wrapper.find('p').text()).toBe('Copyright. All right reserve. More Recipe.');
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

