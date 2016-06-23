import Promise from 'bluebird';

export GET_PROPERTY_LIST = 'GET_PROPERTY_LIST';
export GET_PROPERTY_LIST_SUCCESS = 'GET_PROPERTY_LIST_SUCCESS';
export GET_PROPERTY_LIST_FAILURE = 'GET_PROPERTY_LIST_FAILURE';
import listProperties from '../../mockData/listProperties';

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
