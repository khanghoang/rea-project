import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import ListPropertyContainerConnnect, {ListPropertyContainer} from '../../app/containers/ListPropertyContainer';
import { expect } from 'chai';
import PropertyCard from '../../app/components/PropertyCard';
import configureStore from '../../app/configureStore';
let store;

beforeEach(() => {
  store = configureStore();
  window.__deplay = false;
  window.__setFailure = false;
});

describe('<ListPropertyContainer />', () => {

  it('should render itself', () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );
    expect(list).to.be.present();
  });

  it('should change `isShowingSavedOne` state when click', () => {
    const list = mount(
      <ListPropertyContainer
        resultProperties={[]}
        savedProperties={[]}
        />
    );
    list.find('.toggle-button').simulate('click');
    expect(list).to.have.state('isShowingSavedOne').equal(true);
  });

  it('should show 3 properties after done with fetching', (done) => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    setTimeout(() => {
      expect(list.find('.property-card-wrapper')).to.have.length(3);
      done();
    }, 100)
  });

  it('should show 1 properties when switching to show saved property', (done) => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );
    list.find('.toggle-button').simulate('click');
    setTimeout(() => {
      expect(list.find('.property-card-wrapper').length).to.equal(1);
      done();
    }, 200)
  });

  it('should show 2 properties in saved list after first property is saved', (done) => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    // because saving card is async
    setTimeout(() => {
      // simulate to add
      const addButton = list.find('.property-card-wrapper').first().find('.add-remove-button').first();
      addButton && addButton.simulate('click');

      setTimeout(() => {
        list.find('.toggle-button').first().simulate('click');
        expect(list.find('.property-card-wrapper').length).to.equal(2);
        done();
      }, 100);
    }, 100)
  });

  it('hides the add button on the saved property', (done) => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    // because saving card is async
    setTimeout(() => {
      // simulate to add
      const firstCard = list.find('.property-card-wrapper').first();
      firstCard.find('.add-remove-button')
      .simulate('click');

      setTimeout(() => {
        const card = list.find('.property-card-wrapper').first();
        expect(card.find('.add-remove-button')).to.have.length(0);
        done();
      }, 100)

    }, 100)
  });

  it('should show 0 property after remove the only one saved property', (done) => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    // because saving card is async
    setTimeout(() => {
      // show saved list
      list.find('.toggle-button').first().simulate('click');
      // simulate to remove
      list.find('.property-card-wrapper').first().find('.add-remove-button').first().simulate('click');

      setTimeout(() => {
        expect(list.find('.property-card-wrapper')).to.have.length(0);
        done();
      }, 100);

    }, 100)
  });

  it(`should change property's title when user clicks on ADD button`, (done) => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    // because saving card is async
    setTimeout(() => {
      window.__deplay = true;
      // simulate to add
      list.find('.property-card-wrapper').first().find('.add-remove-button').first().simulate('click');
      setTimeout(() => {
        const button = list.find('.property-card-wrapper').first().find('.add-remove-button').first();
        expect(button.text()).to.equal('Adding...');
        done();
      }, 200);
    }, 100)
  });

  it(`should change property's title when user clicks on REMOVE button`, (done) => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    // because saving card is async
    setTimeout(() => {
      window.__deplay = true;
      // show saved list
      list.find('.toggle-button').first().simulate('click');
      // simulate to remove
      list.find('.property-card-wrapper').first().find('.add-remove-button').first().simulate('click');
      setTimeout(() => {
        const button = list.find('.property-card-wrapper').first().find('.add-remove-button').first();
        expect(button.text()).to.equal('Removing...');
        done();
      }, 200);
    }, 100)
  });

  it(`should change property's title if there is error while ADDING`, (done) => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    // because saving card is async
    setTimeout(() => {
      // set to make request fail
      window.__setFailure = true;
      // simulate to add
      list.find('.property-card-wrapper').first().find('.add-remove-button').first().simulate('click');
      setTimeout(() => {
        const button = list.find('.property-card-wrapper').first().find('.add-remove-button').first();
        expect(button.text()).to.equal('Oops, add again?');
        done();
      }, 100);
    }, 100)
  });

  it(`should change property's title if there is error while REMOVING`, (done) => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    // because saving card is async
    setTimeout(() => {
      // set to make request fail
      window.__setFailure = true;
      // show saved list
      list.find('.toggle-button').first().simulate('click');
      // simulate to add
      list.find('.property-card-wrapper').first().find('.add-remove-button').first().simulate('click');
      setTimeout(() => {
        const button = list.find('.property-card-wrapper').first().find('.add-remove-button').first();
        expect(button.text()).to.equal('Oops, remove again?');
        done();
      }, 100);
    }, 100)
  });

});
