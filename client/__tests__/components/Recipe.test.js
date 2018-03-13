import React from 'react';
import toJSON from 'enzyme-to-json';
import Recipe from '../../src/components/Recipe';

describe('Recipe component', () => {
  const props = {
    recipe: {
      imageUrl: 'image url',
      id: 3,
      title: 'recipe title',
      description: 'recipe description',
      userName: 'username',
      createdAt: 'created at',
      Reviews: [{}],
      Downvotes: [{}],
      Upvotes: [{}]
    }
  };

  it('should render recipe card when props is given', () => {
    const wrapper = shallow(<Recipe {...props} />);
    expect(wrapper.find('div').length).toEqual(6);
    expect(wrapper.find('.card-title').text()).toBe('recipe title')
    expect(wrapper.find('.card-text').text()).toBe('recipe description ...')
      
    
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render text when props is not given', () => {
    const wrapper = shallow(<Recipe />);
    expect(wrapper.find('h1').length).toEqual(1);
    expect(wrapper.find('h1').text()).toBe('No Recipe added yet ...')
  })
});

