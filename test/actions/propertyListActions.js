import configMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promise from '../../app/middlewares/promises';
import * as actions from '../../app/actions/propertyActions';
import { expect } from 'chai';
import _ from 'lodash';

const middlewares = [ thunk, promise ]
const mockStore = configMockStore(middlewares)

describe('Property list action', () => {
  it('creates GET_PROPERTY_LIST_SUCCESS when fetching has been done', () => {
    const expecteOutput = {
      "1": {
        "price": "$726,500",
        "agency": {
          "brandingColors": {
            "primary": "#ffe512"
          },
          "logo": "http://i1.au.reastatic.net/agencylogo/XRWXMT/12/20120927204448.gif"
        },
        "id": "1",
        "mainImage": "http://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg",
        "saved": false
      },
    "2": {
      "price": "$560,520",
      "agency": {
        "brandingColors": {
          "primary": "#fcfa3b"
        },
        "logo": "http://i4.au.reastatic.net/agencylogo/BFERIC/12/20150619122858.gif"
      },
      "id": "2",
      "mainImage": "http://i1.au.reastatic.net/640x480/88586227f9176f602d5c19cf06261108dbb29f03e30d1c4ce9fc2b51fb1e4bd6/main.jpg",
      "saved": false
    },
    "3": {
      "price": "$826,500",
      "agency": {
        "brandingColors": {
          "primary": "#57B5E0"
        },
        "logo": "http://i1.au.reastatic.net/agencylogo/XCEWIN/12/20150807093203.gif"
      },
      "id": "3",
      "mainImage": "http://i4.au.reastatic.net/640x480/98cee1b2a3a64329921fc38f7e2926a78d41fcc683fc48fb8a8ef2999b14c027/main.jpg",
      "saved": false
    },
    "4": {
      "price": "$526,500",
      "agency": {
        "brandingColors": {
          "primary": "#000000"
        },
        "logo": "http://i2.au.reastatic.net/agencylogo/WVYSSK/2/20140701084436.gif"
      },
      "id": "4",
      "mainImage": "http://i2.au.reastatic.net/640x480/5e84d96722dda3ea2a084d6935677f64872d1d760562d530c3cabfcb7bcda9c2/main.jpg",
      "saved": true
    }
    }

    const expectedActions = [
      {
        type: actions.GET_PROPERTY_LIST
      },
      {
        type: actions.GET_PROPERTY_LIST_SUCCESS,
        data: expecteOutput
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
      "mainImage": "http://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg",
      "saved": true
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
    return store.dispatch(actions.saveProperty(property.id))
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
      "saved": true
    }
    const expectedActions = [
      {
        type: actions.UNSAVE_PROPERTY
      },
      {
        type: actions.UNSAVE_PROPERTY_SUCCESS,
        data: _.assign({}, property, {saved: false})
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.unsaveProperty(property.id))
    .then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
