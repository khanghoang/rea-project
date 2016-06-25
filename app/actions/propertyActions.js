import Promise from 'bluebird';
import _ from 'lodash';
import mockData from '../mockData/listProperties';

export const GET_PROPERTY_LIST = 'GET_PROPERTY_LIST';
export const GET_PROPERTY_LIST_SUCCESS = 'GET_PROPERTY_LIST_SUCCESS';
export const GET_PROPERTY_LIST_FAILURE = 'GET_PROPERTY_LIST_FAILURE';

const timeout = () => {
  return window.__deplay ? 3000 : 0;
}

const handler = (resolve, reject) => {
  if (window.__setFailure) {
    reject(new Error('There is an error, please try again'));
    return function() {}
  }
  return resolve;
}

const parseListProperty = (res) => {

  const resultArray = _.reduce(res.results, (acc, p) => {

    // assign `saved` to false
    const newProperty = _.assign({}, p, {saved: false});
    acc[p.id] = newProperty;
    return acc;
  }, {});

  const savedArray = _.reduce(res.saved, (acc, p) => {

    // assign `saved` to true
    const newProperty = _.assign({}, p, {saved: true});
    acc[p.id] = newProperty;
    return acc;
  }, {});

  return _.assign({}, resultArray, savedArray);
}

const listProperties = parseListProperty(mockData);

export const fetchPropertyList = () => {

  return {
    types: [
      GET_PROPERTY_LIST,
      GET_PROPERTY_LIST_SUCCESS,
      GET_PROPERTY_LIST_FAILURE
    ],
    promise: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          handler(resolve, reject)(listProperties);
        }, timeout())
      });
    }
  }
}

export const SAVE_PROPERTY = 'SAVE_PROPERTY';
export const SAVE_PROPERTY_SUCCESS = 'SAVE_PROPERTY_SUCCESS';
export const SAVE_PROPERTY_FAILURE = 'SAVE_PROPERTY_FAILURE';

export const saveProperty = (propertyID) => {
  return {
    types: [
      SAVE_PROPERTY,
      SAVE_PROPERTY_SUCCESS,
      SAVE_PROPERTY_FAILURE
    ],
    promise: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          handler(resolve, reject)(_.assign({}, listProperties[propertyID], {saved: true}));
        }, timeout())
      })
    }
  }
}

export const UNSAVE_PROPERTY = 'UNSAVE_PROPERTY';
export const UNSAVE_PROPERTY_SUCCESS = 'UNSAVE_PROPERTY_SUCCESS';
export const UNSAVE_PROPERTY_FAILURE = 'UNSAVE_PROPERTY_FAILURE';

export const unsaveProperty = (propertyID) => {
  return {
    types: [
      UNSAVE_PROPERTY,
      UNSAVE_PROPERTY_SUCCESS,
      UNSAVE_PROPERTY_FAILURE
    ],
    promise: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          handler(resolve, reject)(_.assign({}, listProperties[propertyID], {saved: false}));
        }, timeout())
      })
    }
  }
}
