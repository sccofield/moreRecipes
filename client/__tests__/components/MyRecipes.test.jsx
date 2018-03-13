import React from 'react';
import toJSON from 'enzyme-to-json';
import MyRecipes from '../../src/components/dashboard/MyRecipes';

describe('My Recipe component', () => {
  const props = {
    onDelete: jest.fn(() => Promise.resolve()),
    handlePageClick: jest.fn(() => Promise.resolve()),
    pageCount: 1,
    userRecipes: [{
      id: 3,
      title: 'title',
      imageUrl: 'image',
      description: 'description',
      userName: 'username',
      createdAt: 'createdat'


    }]
  };

  const noUserRecipesProps = {
    onDelete: jest.fn(() => Promise.resolve()),
    handlePageClick: jest.fn(() => Promise.resolve()),
    pageCount: 1,
    userRecipes: []
  };


  it('should render MyRecipesRecipes form when props is given', () => {
    const wrapper = shallow(<MyRecipes {...props} />);
    expect(wrapper.find('div').length).toEqual(13);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render text when props is not given', () => {
    const wrapper = shallow(<MyRecipes {...noUserRecipesProps} />);
    expect(wrapper.find('p').length).toEqual(2);
    expect(wrapper.find('p .noRecipe')
      .text()).toBe('You have not created any recipe yet.');
  });
});

