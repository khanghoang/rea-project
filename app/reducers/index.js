import * as propertyActions from '../actions/propertyActions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch(action.type) {

    case propertyActions.GET_PROPERTY_LIST_SUCCESS: {
      return _.assign(
        {},
        {
          properties: action.data
        }
      );
      break;
    }

    case propertyActions.SAVE_PROPERTY_SUCCESS:
    case propertyActions.UNSAVE_PROPERTY_SUCCESS: {

      const id = _.get(action, 'data.id', null);
      if (!id) {
        return state;
      }

      const savedProperty = {};
      savedProperty[action.data.id] = action.data;
      return _.assign(
        {},
        state,
        savedProperty
      );
      break;
    }

    default: {
      return state;
      break;
    }
  }
}
