import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import ListPropertyContainerConnnect, {ListPropertyContainer} from '../../app/containers/ListPropertyContainer';
import { expect } from 'chai';
import PropertyCard from '../../app/components/PropertyCard';
import configureStore from '../../app/configureStore';
import Promise from 'bluebird';
import sleep from '../utils/sleep';

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

  it('should show 3 properties after done with fetching', async () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    await sleep(0);
    expect(list.find('.property-card-wrapper')).to.have.length(3);
  });

  it('should show 1 properties when switching to show saved property', async () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );
    list.find('.toggle-button').simulate('click');

    await sleep(0);
    expect(list.find('.property-card-wrapper').length).to.equal(1);
  });

  it('should show 2 properties in saved list after first property is saved', async () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    await sleep();
    const addButton = list.find('.property-card-wrapper').first().find('.add-remove-button').first();
    addButton && addButton.simulate('click');

    await sleep();
    list.find('.toggle-button').first().simulate('click');
    expect(list.find('.property-card-wrapper').length).to.equal(2);
  });

  it('hides the add button on the saved property', async () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    await sleep();
    const firstCard = list.find('.property-card-wrapper').first();
    firstCard.find('.add-remove-button').simulate('click');

    await sleep();
    const card = list.find('.property-card-wrapper').first();
    expect(card.find('.add-remove-button')).to.have.length(0);
  });

  it('should show 0 property after remove the only one saved property', async () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    await sleep(0);
    list.find('.toggle-button').first().simulate('click');
    // simulate to remove
    list.find('.property-card-wrapper').first().find('.add-remove-button').first().simulate('click');

    await sleep(0)
    expect(list.find('.property-card-wrapper')).to.have.length(0);
  });

  it(`should change property's title when user clicks on ADD button`, async () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    await sleep(0)
    window.__deplay = true;
    // simulate to add
    list.find('.property-card-wrapper').first().find('.add-remove-button').first().simulate('click');

    await sleep(0);
    const button = list.find('.property-card-wrapper').first().find('.add-remove-button').first();
    expect(button.text()).to.equal('Adding...');
  });

  it(`should change property's title when user clicks on REMOVE button`, async () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    await sleep(0);
    window.__deplay = true;
    // show saved list
    list.find('.toggle-button').first().simulate('click');
    // simulate to remove
    list.find('.property-card-wrapper').first().find('.add-remove-button').first().simulate('click');

    await sleep(0);
    const button = list.find('.property-card-wrapper').first().find('.add-remove-button').first();
    expect(button.text()).to.equal('Removing...');
  });

  it(`should change property's title if there is error while ADDING`, async () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    await sleep(0);
    // set to make request fail
    window.__setFailure = true;
    // simulate to add
    list.find('.property-card-wrapper').first().find('.add-remove-button').first().simulate('click');

    await sleep(200);
    const button = list.find('.property-card-wrapper').first().find('.add-remove-button').first();
    expect(button.text()).to.equal('Oops, add again?');
  });

  it(`should change property's title if there is error while REMOVING`, async () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    // because saving card is async
    await sleep(0);

    // set to make request fail
    window.__setFailure = true;
    // show saved list
    list.find('.toggle-button').first().simulate('click');
    // simulate to add
    list.find('.property-card-wrapper').first().find('.add-remove-button').first().simulate('click');

    await sleep(200);

    const button = list.find('.property-card-wrapper').first().find('.add-remove-button').first();
    expect(button.text()).to.equal('Oops, remove again?');
  });

});
