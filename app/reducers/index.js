import * as propertyActions from '../actions/propertyActions';
import _ from 'lodash';

export default function(state = {properties: {}}, action) {
  switch(action.type) {

    case propertyActions.GET_PROPERTY_LIST_SUCCESS: {
      return _.assign(
        {},
        {
          properties: action.data
        }
      );
    }

    case propertyActions.SAVE_PROPERTY_SUCCESS: {
      const id = _.get(action, 'data.id', null);
      if (!id) {
        return state;
      }

      state.properties[id] = action.data;

      return _.assign(
        {},
        state
      );
    }

    case propertyActions.UNSAVE_PROPERTY_SUCCESS: {
      const id = _.get(action, 'data.id', null);
      if (!id) {
        return state;
      }

      state.properties[id] = action.data;

      return _.assign(
        {},
        state
      );
    }

    default: {
      return state;
    }
  }
}

const convertPropertiesToArray = (properties) => {
  return _.chain(properties)
  .map(p => {
    return p;
  })
  .sortBy(p => {
    return p.id;
  }).value();
}

export const getSavedProperties = (state) => {
  return _.filter(convertPropertiesToArray(state.properties), p => p.saved);
}

export const getResultProperties = (state) => {
  return _.filter(convertPropertiesToArray(state.properties), p => !p.saved);
}
