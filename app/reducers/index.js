import * as propertyActions from '../actions/propertyActions';
import _ from 'lodash';

const intialState = {
  resutls: {},
  saved: {}
}

export default function(state = intialState, action) {
  switch(action.type) {

    case propertyActions.GET_PROPERTY_LIST_SUCCESS: {
      return _.assign(
        {},
        {
          results: _.get(action.data, 'results', {}),
          saved: _.get(action.data, 'saved', {})
        }
      );
    }

    case propertyActions.SAVE_PROPERTY_SUCCESS: {
      const id = _.get(action, 'data.id', null);
      if (!id) {
        return state;
      }

      const newState = _.assign({}, state);
      _.set(newState, `saved.['${id}']`, action.data)

      return _.assign(
        {},
        newState
      );
    }

    case propertyActions.UNSAVE_PROPERTY_SUCCESS: {
      const id = _.get(action, 'data.id', null);
      if (!id) {
        return state;
      }

      const newState = _.assign({}, state);
      delete newState.saved[id];

      return _.assign(
        {},
        newState
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
  return convertPropertiesToArray(state.saved)
  .map(p => {
    p.saved = true;
    return p;
  });
}

export const getResultProperties = (state) => {
  return convertPropertiesToArray(state.results)
  .map(p => {
    p.showButton = true;

    // if it is in saved list
    if (state.saved[p.id]) {

      // hide add button
      p.showButton = false;
    }

    return p;
  })
}
