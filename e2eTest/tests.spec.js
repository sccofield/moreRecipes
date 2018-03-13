import bcrypt from 'bcrypt';
import db from '../server/models';

import { user1, user2, recipe1, recipe2, recipe3, review } from './data';

const baseUrl = 'http://localhost:8000';
const short = 1000;
const long = 3000;
const saltRounds = 10;

const mockData = {};


module.exports = {
  before: (async (done) => {
    await db.sequelize.sync();
    await db.Upvote.destroy({ where: {} });
    await db.Downvote.destroy({ where: {} });
    await db.Favorite.destroy({ where: {} });
    await db.Recipe.destroy({ where: {} });
    await db.User.destroy({ where: {} });
    mockData.user1 = await db.User.create({
      userName: 'mike@gmail.com',
      email: 'mike@gmail.com',
      password: bcrypt.hashSync('michael', saltRounds)
    });
    done();
  }),
  'Display homepage and ensure all element are available': (browser) => {
    browser
      .url(baseUrl)
      .maximizeWindow()
      .pause(long)
      .assert.containsText(
        'header',
        'The best recipes in the world come from real people like you'
      )
      .assert.containsText('#popularRecipe', 'Popular Recipes')
      .assert.containsText('#latestRecipe', 'Latest Recipes')
      .assert.containsText('.cta', 'Do you have a beautiful Recipe')
      .assert.containsText(
        'footer',
        'Copyright. All right reserve. More Recipe'
      );
  },

  'user receives error when the sign up form is not properly filled':
  (browser) => {
    browser
      .url(baseUrl)
      .maximizeWindow()
      .pause(long)
      .click('#register')
      .waitForElementVisible('.form-header', short)
      .assert.containsText('.main', 'Register')
      .setValue('input[name=userName]', user1.userName)
      .setValue('input[name=email]', user1.email)
      .setValue('input[name=password]', user1.password)
      .setValue('input[name=cPassword]', user1.cPassword)
      .execute(() => {
        document.querySelector('#registerSubmit').click();
      })
      .pause(long)
      .assert.containsText('.errorMessage', 'Passwords don\'t match')
      .pause(long)
      .url(`${baseUrl}/register`)
      .waitForElementVisible('.form-header', short)
      .assert.containsText('.main', 'Register')
      .setValue('input[name=userName]', user2.userName)
      .setValue('input[name=email]', user1.email)
      .setValue('input[name=password]', user2.password)
      .setValue('input[name=cPassword]', user2.cPassword)
      .execute(() => {
        document.querySelector('#registerSubmit').click();
      })
      .pause(long)
      .assert.containsText(
        '.errorMessage',
        'Email already used. please try another email'
      );
  },

  'User gets signed in when the correct details are put': (browser) => {
    browser
      .pause(short)
      .url(`${baseUrl}/register`)
      .waitForElementVisible('.form-header', short)
      .assert.containsText('.main', 'Register')
      .setValue('input[name=userName]', user2.userName)
      .setValue('input[name=email]', user2.email)
      .setValue('input[name=password]', user2.password)
      .setValue('input[name=cPassword]', user2.cPassword)
      .execute(() => {
        document.querySelector('#registerSubmit').click();
      })
      .pause(7000)
      .assert.urlContains(baseUrl)
      .assert.containsText('#profile', 'Profile');
  },

  'User creates new recipe': (browser) => {
    browser
      .click('#postRecipe')
      .pause(short)
      .waitForElementVisible('form', short)
      .assert.containsText('.main', 'Add New Recipe')
      .setValue('input[name=title]', recipe1.title)
      .setValue('textarea[name=ingredients]', recipe1.ingredient)
      .setValue('textarea[name=description]', recipe1.description)
      .execute(() => {
        document.querySelector('#recipeSubmit').click();
      })
      .pause(long)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Your recipe has been added')
      .assert.containsText('.recipeTitle', recipe1.title)
      .assert.containsText('.methods', recipe1.description)
      .pause(long);
  },

  'User creates second recipe': (browser) => {
    browser
      .click('#postRecipe')
      .pause(short)
      .waitForElementVisible('form', short)
      .assert.containsText('.main', 'Add New Recipe')
      .setValue('input[name=title]', recipe2.title)
      .setValue('textarea[name=ingredients]', recipe2.ingredient)
      .setValue('textarea[name=description]', recipe2.description)
      .execute(() => {
        document.querySelector('#recipeSubmit').click();
      })
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Your recipe has been added')
      .assert.containsText('.recipeTitle', recipe2.title)
      .assert.containsText('.methods', recipe2.description)
      .pause(long);
  },

  'User creates third recipe': (browser) => {
    browser
      .click('#postRecipe')
      .pause(short)
      .waitForElementVisible('form', short)
      .assert.containsText('.main', 'Add New Recipe')
      .setValue('input[name=title]', recipe3.title)
      .setValue('textarea[name=ingredients]', recipe3.ingredient)
      .setValue('textarea[name=description]', recipe3.description)
      .execute(() => {
        document.querySelector('#recipeSubmit').click();
      })
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Your recipe has been added')
      .assert.containsText('.recipeTitle', recipe3.title)
      .assert.containsText('.methods', recipe3.description)
      .pause(long);
  },

  'User can add a review': (browser) => {
    browser
      .pause(long)
      .pause(long)
      .waitForElementVisible('form', short)
      .assert.containsText('.text-center', 'Reviews')
      .setValue('textarea[name=review]', review.review)
      .execute(() => {
        document.querySelector('.recipeButton').click();
      })
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .pause(short)
      .assert
      .containsText('.toast-message', 'Your Review has been added')
      .assert.containsText('.singleReview', review.review);
  },

  'User can add upvote': (browser) => {
    browser
      .pause(long)
      .pause(long)
      .click('#upvoteButton')
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Upvote recipe succesfully')
      .assert.cssClassPresent('#upvoteButton', 'vote');
  },

  'User can remove upvote': (browser) => {
    browser
      .pause(long)
      .pause(long)
      .click('#upvoteButton')
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Upvote removed from recipe')
      .assert.cssClassNotPresent('#upvoteButton', 'vote');
  },

  'User can add downvote': (browser) => {
    browser
      .pause(long)
      .pause(long)
      .click('#downvoteButton')
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Downvote Recipe successful')
      .assert.cssClassPresent('#downvoteButton', 'vote');
  },

  'User can remove downvote': (browser) => {
    browser
      .pause(long)
      .pause(long)
      .click('#downvoteButton')
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Downvote removed from recipe')
      .assert.cssClassNotPresent('#downvoteButton', 'vote');
  },

  'User can add favorite': (browser) => {
    browser
      .pause(long)
      .pause(long)
      .click('#favouriteButton')
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText('.toast-message', 'Recipe added to favourite')
      .assert.cssClassPresent('#favouriteButton', 'favourite');
  },

  'User can remove favorite': (browser) => {
    browser
      .pause(long)
      .pause(long)
      .click('#favouriteButton')
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .assert
      .containsText(
        '.toast-message',
        'You have removed recipe from your favourites'
      )
      .assert.cssClassNotPresent('#favouriteButton', 'favourite');
  },

  'User can search for a recipe': (browser) => {
    browser
      .pause(long)
      .click('#exploreRecipe')
      .pause(long)
      .setValue('input[name=search]', recipe1.title)
      .execute(() => {
        document.querySelector('#searchRecipe').click();
      })
      .pause(long)
      .assert
      .containsText('.recipes', recipe1.title);
  },

  'User can view his profile': (browser) => {
    browser
      .pause(long)
      .click('#profile')
      .pause(long)
      .assert
      .containsText('.author-box', `Hi ${user2.userName} !`)
      .pause(long);
  },

  'User can edit Recipe': (browser) => {
    browser
      .pause(long)
      .click('#editRecipe')
      .pause(long)
      .setValue('input[name=title]', 'new recipe title')
      .execute(() => {
        document.querySelector('#recipeSubmit').click();
      })
      .pause(short)
      .waitForElementVisible('.toast-message', short)
      .pause(short)
      .assert
      .containsText('.toast-message', 'Recipe edited succesfully');
  },


  'User should be able to log out': (browser) => {
    browser
      .pause(long)
      .click('.navbar-dark')
      .click('#logout')
      .pause(long)
      .assert.containsText('#login', 'Login')
      .assert.containsText('#register', 'Register')
      .end();
  },

};

