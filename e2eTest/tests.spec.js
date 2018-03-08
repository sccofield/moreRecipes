import bcrypt from 'bcrypt';
import db from '../server/models';

const baseUrl = 'http://localhost:8000';
const veryShort = 500;
const short = 1000;
const long = 3000;
const saltRounds = 10;


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
    done()
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

  'user receives error when the sign up form is not properly filled': (browser) => {
    browser
      .url(baseUrl)
      .maximizeWindow()
      .pause(long)
      .click('#register')
      .waitForElementVisible('.form-header', short)
      .assert.containsText('.main', 'Register')
      .setValue('input[name=userName]', 'michael')
      .setValue('input[name=email]', 'mike@gmail.com')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=cPassword]', 'passwor')
      .execute(() => {
        document.querySelector('#registerSubmit').click();
      })
      .pause(long)
      .assert.containsText('.errorMessage', 'Passwords don\'t match')
      .pause(long)
      .url(`${baseUrl}/register`)
      .waitForElementVisible('.form-header', short)
      .assert.containsText('.main', 'Register')
      .setValue('input[name=userName]', 'mike')
      .setValue('input[name=email]', 'mike@gmail.com')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=cPassword]', 'password')
      .execute(() => {
        document.querySelector('#registerSubmit').click();
      })
      .pause(long)
      // .assert.containsText('.errorMessage', 'Email already used. please try another email');
  },

  'User gets signed in when the correct details are put': (browser) => {
    browser
      .pause(short)
      .url(`${baseUrl}/register`)
      .waitForElementVisible('.form-header', short)
      .assert.containsText('.main', 'Register')
      .setValue('input[name=userName]', 'mike1')
      .setValue('input[name=email]', 'mike3@gmail.com')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=cPassword]', 'password')
      .execute(() => {
        document.querySelector('#registerSubmit').click();
      })
      .pause(7000)
      .assert.urlContains(baseUrl)
      .assert.containsText('#profile', 'Profile');
  },

  'User should be able to log out': (browser) => {
    browser
      .pause(short)
      .click('#logout')
      .assert.containsText('#login', 'Login')
      .assert.containsText('#register', 'Register')
      .end();
  }

};

