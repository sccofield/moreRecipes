import React from 'react';
import toJSON from 'enzyme-to-json';

import { Header, mapDispatchToProps }
  from '../../src/components/PageHeader';

describe('Upvote component', () => {
  it('should render the component', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header').exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('conatiner functions', () => {
  test('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch))
      .toHaveProperty('logoutUser');

    const { logoutUser } = mapDispatchToProps(dispatch);
    logoutUser();
    expect(dispatch).toHaveBeenCalled();
  });
});
