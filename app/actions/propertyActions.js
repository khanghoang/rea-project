import Promise from 'bluebird';
import listProperties from '../../mockData/listProperties';

export const GET_PROPERTY_LIST = 'GET_PROPERTY_LIST';
export const GET_PROPERTY_LIST_SUCCESS = 'GET_PROPERTY_LIST_SUCCESS';
export const GET_PROPERTY_LIST_FAILURE = 'GET_PROPERTY_LIST_FAILURE';

export const fetchPropertyList = () => {
  return {
    types: [
    ],
    promise: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(listProperties);
        }, 500)
      });
    }
  }
}
