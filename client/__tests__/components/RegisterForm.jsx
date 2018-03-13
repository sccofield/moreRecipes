import React from 'react';
import toJSON from 'enzyme-to-json';
import RegisterForm from '../../src/components/register/RegisterForm';

describe('Recipe component', () => {
  const props = {
    errorMessage: null,
    errors: null,
    state: {
      cPassword: 'password',
      password: 'password',
      userName: 'test',
      errors: null,
      email: 'test@test.com'
    },
    
  };

  const errorProps = {
    errorMessage: null,
    errors: null,
    state: {
      cPassword: 'password',
      password: 'password',
      userName: 'test',
      errors: ['new error'],
      email: 'test@test.com'
  },
  
}

const errorProps2 = {
  errorMessage: 'error',
  errors: null,
  state: {
    cPassword: 'password',
    password: 'password',
    userName: 'test',
    errors: null,
    email: 'test@test.com'
},

}

  it('should render register form when props is given', () => {
    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.find('div').length).toEqual(9);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should show error message when there is an error in state', ()=> {
    const wrapper = shallow(<RegisterForm {...errorProps } />);
    expect(wrapper.find('.errorMessage').text()).toBe('new error');
    expect(wrapper.find('.errorMessage li').length).toEqual(1);
    
  });

  it('should show error message when there is an error in props', ()=> {
    const wrapper = shallow(<RegisterForm {...errorProps2 } />);
    expect(wrapper.find('.errorMessage').text()).toBe('error');
    expect(wrapper.find('.errorMessage').length).toEqual(1);
    
  })

});

