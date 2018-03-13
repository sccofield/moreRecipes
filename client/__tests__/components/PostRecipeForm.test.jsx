import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import PostRecipeForm from '../../src/components/postRecipe/PostRecipeForm';
import { PostRecipe } from '../../src/components/postRecipe/PostRecipe';

describe('Recipe component', () => {
  const props = {
    state: {
      description: 'description',
      image: 'image',
      ingredients: 'ingredients',
      title: 'title'
    }
  };

  const errorProps = {
    state: {
      description: 'description',
      image: 'image',
      ingredients: 'ingredients',
      title: 'title',
      errors: ['error']
    }
  };

  const imageProps = {
    state: {
      description: 'description',
      image: 'image',
      ingredients: 'ingredients',
      title: 'title',
    },
    imagePreview: 'image'
  };


  it('should render postRecipe form when props is given', () => {
    const wrapper = shallow(<PostRecipeForm {...props} />);
    expect(wrapper.find('div').length).toEqual(6);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should show error message when there is an error in state', () => {
    const wrapper = shallow(<PostRecipeForm {...errorProps} />);
    expect(wrapper.find('.errorMessage').text()).toBe('error');
    expect(wrapper.find('.errorMessage li').length).toEqual(1);
  });

  it('should show the image if it has been uploaded', () => {
    const wrapper = shallow(<PostRecipeForm {...imageProps} />);
    expect(wrapper.find('.imagePreview').length).toEqual(1);
  });

  it('should call the onsubmit function when the form is submitted', () => {
    const spy = sinon.spy(PostRecipe.prototype, 'onSubmit');
    const Props = {
      ...props,
      onSubmit: spy
    };
    const wrapper = shallow(<PostRecipeForm {...Props} />);
    try {
      wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    } catch (error) {

    }
    expect(spy.called).toBeTruthy();
  });
});

