import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;

const localStorageStore = {};

global.localStorage = {
  getItem: key => {
    return localStorageStore[key];
  },

  setItem: (key, value) => {
    localStorageStore[key] = value;
  },

  removeItem: key => {
    delete localStorageStore[key];
  }
};

global.JSON = {
  parse: payload => payload,
  stringify: payload => payload
};

// const localStorage = {
//   /**
//    * Get item from local storage
//    * @param {string} key
//    *
//    * @returns {any} any
//    */
//   getItem(key) {
//     return localStorageStore[key];
//   },
//   /**
//    * Set item to local storage
//    * @param {string} key
//    * @param {string} value
//    *
//    * @returns {any} any
//    */
//   setItem(key, value) {
//     localStorageStore[key] = value;
//   },
//   /**
//    * Remove item from local storage
//    * @param {string} key
//    *
//    * @returns {any} any
//    */
//   removeItem(key) {
//     delete localStorageStore[key];
//   }
// };

// Object.defineProperty(window, 'localStorage', {
//   value: localStorage,
// });
