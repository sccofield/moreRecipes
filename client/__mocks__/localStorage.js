import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const localStorageStore = {};

const localStorage = {
  /**
   * Get item from local storage
   * @param {string} key
   *
   * @returns {any} any
   */
  getItem(key) {
    return localStorageStore[key];
  },
  /**
   * Set item to local storage
   * @param {string} key
   * @param {string} value
   *
   * @returns {any} any
   */
  setItem(key, value) {
    localStorageStore[key] = value;
  },
  /**
   * Remove item from local storage
   * @param {string} key
   *
   * @returns {any} any
   */
  removeItem(key) {
    delete localStorageStore[key];
  }
};

Object.defineProperty(window, 'localStorage', {
  value: localStorage,
});