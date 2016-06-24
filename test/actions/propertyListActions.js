import configMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promise from '../../app/middlewares/promises';
import * as actions from '../../app/actions/propertyActions';
import { expect } from 'chai';
import listProperties from '../../mockData/listProperties';
import _ from 'lodash';

const middlewares = [ thunk, promise ]
const mockStore = configMockStore(middlewares)

describe('Property list action', () => {
  it('creates GET_PROPERTY_LIST_SUCCESS when fetching has been done', () => {
    const expectedActions = [
      {
        type: actions.GET_PROPERTY_LIST
      },
      {
        type: actions.GET_PROPERTY_LIST_SUCCESS,
        data:listProperties
      }
    ];
    const store = mockStore({});
    return store.dispatch(actions.fetchPropertyList())
    .then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('saves SAVE_PROPERTY_SUCCESS when saving has been done', () => {
    const property = {
      "price": "$726,500",
      "agency": {
        "brandingColors": {
          "primary": "#ffe512"
        },
        "logo": "http://i1.au.reastatic.net/agencylogo/XRWXMT/12/20120927204448.gif"
      },
      "id": "1",
      "mainImage": "http://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg"
    }
    const expectedActions = [
      {
        type: actions.SAVE_PROPERTY
      },
      {
        type: actions.SAVE_PROPERTY_SUCCESS,
        data: _.assign({}, property, {saved: true})
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.saveProperty(property))
    .then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('unsaves UNSAVE_PROPERTY_SUCCESS when saving has been done', () => {
    const property = {
      "price": "$726,500",
      "agency": {
        "brandingColors": {
          "primary": "#ffe512"
        },
        "logo": "http://i1.au.reastatic.net/agencylogo/XRWXMT/12/20120927204448.gif"
      },
      "id": "1",
      "mainImage": "http://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg",
    }
    const expectedActions = [
      {
        type: actions.SAVE_PROPERTY
      },
      {
        type: actions.SAVE_PROPERTY_SUCCESS,
        data: _.assign({}, property, {saved: false})
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.unsaveProperty(property))
    .then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
