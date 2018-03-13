import React from 'react';
import toJSON from 'enzyme-to-json';
import EditRecipeForm from '../../src/components/editRecipe/EditRecipeForm';

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
      imageUrl: 'image',
      ingredients: 'ingredients',
      title: 'title',
    },
    imagePreview: 'image'
  };

  
  it('should render editRecipe form when props is given', () => {
    const wrapper = shallow(<EditRecipeForm {...props} />);
    expect(wrapper.find('div').length).toEqual(6);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should show error message when there is an error in state', ()=> {
    const wrapper = shallow(<EditRecipeForm {...errorProps } />);
    expect(wrapper.find('.errorMessage').text()).toBe('error');
    expect(wrapper.find('.errorMessage li').length).toEqual(1);
    
  });

  it('should show the image if it has been uploaded', ()=> {
    const wrapper = shallow(<EditRecipeForm {...imageProps } />);
    expect(wrapper.find('.imagePreview').length).toEqual(1);
    
  });

});

