import reducers from '../../app/reducers';
import { expect } from 'chai';
import * as actions from '../../app/actions/propertyActions';

const state = {
  results: {
    "1": {
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
  },
  saved: {
    "2": {
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
  }
}


describe('MAIN REDUCER', () => {
  it('should have default state', () => {
    const expected = {};
    const actual = reducers({}, {type: 'null-action'});
    expect(actual).to.deep.equal(expected);
  });

  it('should have "results" and "saved" when GET_PROPERTY_LIST_SUCCESS', () => {
    const data = {
      results: {
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
        }
      },
      saved: {
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
    }

    const expected = data;
    const actual = reducers({}, {type: actions.GET_PROPERTY_LIST_SUCCESS, data: data});
    expect(actual).to.deep.equal(expected);
  });

  context('SAVE PROPERTY', () => {

    it('will return current state when there is no "property.id" in the response', () => {
      const state = {
        resutls: {
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
          },
          "2": {
            "price": "$726,500",
            "agency": {
              "brandingColors": {
                "primary": "#ffe512"
              },
              "logo": "http://i1.au.reastatic.net/agencylogo/XRWXMT/12/20120927204448.gif"
            },
            "id": "1",
            "mainImage": "http://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg",
          },
        },
        saved: {}
      }

      const actual = reducers(state, {type: actions.SAVE_PROPERTY_SUCCESS, data: null});
      expect(actual).to.deep.equal(state);
    });

    it('will override property when SAVE_PROPERTY_SUCCESS', () => {
      const savedProperty = {
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
      };

      const expected = {
        results: {
          "1": {
            "price": "$726,500",
            "agency": {
              "brandingColors": {
                "primary": "#ffe512"
              },
              "logo": "http://i1.au.reastatic.net/agencylogo/XRWXMT/12/20120927204448.gif"
            },
            "id": "1",
            "mainImage": "http://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg"
          },
        },
        saved: {
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
            "saved": true
          },
          "2": {
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
        }
      }

      const actual = reducers(state, {type: actions.SAVE_PROPERTY_SUCCESS, data: savedProperty});
      expect(actual).to.deep.equal(expected);

    });

  })

  context('UNSAVE PROPERTY', () => {

    it('will return current state when there is no "property.id" in the response', () => {
      const state = {
        results: {
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
            "saved": true
          },
          "2": {
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
          },
        },
        saved: {
        }
      }

      const actual = reducers(state, {type: actions.UNSAVE_PROPERTY_SUCCESS, data: null});
      expect(actual).to.deep.equal(state);
    });
    it('will override property when UNSAVE_PROPERTY_SUCCESS', () => {
      const state = {
        results: {
          "1": {
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
        },
        saved: {
          "2": {
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
        }
      }

      const unsavedProperty = {
        "price": "$726,500",
        "agency": {
          "brandingColors": {
            "primary": "#ffe512"
          },
          "logo": "http://i1.au.reastatic.net/agencylogo/XRWXMT/12/20120927204448.gif"
        },
        "id": "2",
        "mainImage": "http://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg",
        "saved": false
      };

      const expected = {
        results: {
          "1": {
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
        },
        saved: {
        }
      }

      const actual = reducers(state, {type: actions.UNSAVE_PROPERTY_SUCCESS, data: unsavedProperty});
      expect(actual).to.deep.equal(expected);

    });

  });
})
