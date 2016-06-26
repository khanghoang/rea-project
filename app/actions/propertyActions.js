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

  const saved = _.reduce(res.saved, (acc, p) => {

    // assign `saved` to true
    const newProperty = _.assign({}, p, {saved: true});
    acc[p.id] = newProperty;
    return acc;
  }, {});

  const results = _.reduce(res.results, (acc, p) => {

    // assign `saved` to false
    const isSaved = saved[p.id] ? true : false;
    const newProperty = _.assign({}, p, {saved: isSaved});
    acc[p.id] = newProperty;
    return acc;
  }, {});

  return _.assign({}, results, saved);
}

const listProperties = parseListProperty(mockData);


// for fetch list property request
const listPropertiesFromRemote = (res) => {

  const transform = (arr) => {
    return _.reduce(arr, (acc, p) => {
      const newProperty = _.assign({}, p);
      acc[p.id] = newProperty;
      return acc;
    }, {});
  }

  const results = transform(res.results);
  const saved = transform(res.saved);

  return _.assign({}, {results: results}, {saved: saved});
}

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
          handler(resolve, reject)(listPropertiesFromRemote(mockData));
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
