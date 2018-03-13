import React from 'react';
import toJSON from 'enzyme-to-json';
import FavoriteRecipes from '../../src/components/dashboard/FavoriteRecipes';

describe('Recipe component', () => {
  const props = {
    handlePageClick: jest.fn(() => Promise.resolve()),
    pageCount: 2,
    favouriteRecipes: [{
      id: 3,
      Recipe: {
        title: 'title',
        imageUrl: 'image',
        description: 'description',
        userName: 'username',
        createdAt: 'createdat'

      }

    }]
  };

  const noFavouriteProps = {
    handlePageClick: jest.fn(() => Promise.resolve()),
    pageCount: 2,
    favouriteRecipes: []
  };


  it('should render FavoriteRecipes form when props is given', () => {
    const wrapper = shallow(<FavoriteRecipes {...props} />);
    expect(wrapper.find('div').length).toEqual(7);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render text when props is not given', () => {
    const wrapper = shallow(<FavoriteRecipes {...noFavouriteProps} />);
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p')
      .text()).toBe('You have not added any recipe to your favourites yet.');
  });
});

