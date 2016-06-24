import Promise from 'bluebird';
import _ from 'lodash';
import listProperties from '../../mockData/listProperties';

export const GET_PROPERTY_LIST = 'GET_PROPERTY_LIST';
export const GET_PROPERTY_LIST_SUCCESS = 'GET_PROPERTY_LIST_SUCCESS';
export const GET_PROPERTY_LIST_FAILURE = 'GET_PROPERTY_LIST_FAILURE';

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
          resolve(listProperties);
        }, 0)
      });
    }
  }
}

export const SAVE_PROPERTY = 'SAVE_PROPERTY';
export const SAVE_PROPERTY_SUCCESS = 'SAVE_PROPERTY_SUCCESS';
export const SAVE_PROPERTY_FAILURE = 'SAVE_PROPERTY_FAILURE';

export const saveProperty = (property) => {
  return {
    types: [
      SAVE_PROPERTY,
      SAVE_PROPERTY_SUCCESS,
      SAVE_PROPERTY_FAILURE
    ],
    promise: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(_.assign({}, property, {saved: true}));
        })
      })
    }
  }
}

export const UNSAVE_PROPERTY = 'UNSAVE_PROPERTY';
export const UNSAVE_PROPERTY_SUCCESS = 'UNSAVE_PROPERTY_SUCCESS';
export const UNSAVE_PROPERTY_FAILURE = 'UNSAVE_PROPERTY_FAILURE';

export const unsaveProperty = (property) => {
  return {
    types: [
      SAVE_PROPERTY,
      SAVE_PROPERTY_SUCCESS,
      SAVE_PROPERTY_FAILURE
    ],
    promise: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(_.assign({}, property, {saved: false}));
        })
      })
    }
  }
}
