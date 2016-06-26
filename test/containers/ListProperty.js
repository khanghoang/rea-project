import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import ListPropertyContainerConnnect, {ListPropertyContainer} from '../../app/containers/ListPropertyContainer';
import { expect } from 'chai';
import PropertyCard from '../../app/components/PropertyCard';

import configureStore from '../../app/configureStore';
const store = configureStore();

describe('<ListPropertyContainer />', () => {

  it('should render itself', () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );
    expect(list).to.be.present()
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

  it('should show 3 properties after done with fetching', () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );
    expect(list.find('.property-card-wrapper').length).to.equal(3);
  });

  it('should show 1 properties when switching to show saved property', () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );
    list.find('.toggle-button').simulate('click');
    expect(list.find('.property-card-wrapper').length).to.equal(1);
  });

  it('should show 2 properties in save list after save first property', () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    // simulate to add
    list.find('.property-card-wrapper').first().find('.add-remove-button').simulate('click');

    // because saving card is async
    setTimeout(() => {

      // switch to saved list 
      list.find('.toggle-button').simulate('click');

      expect(list.find('.property-card-wrapper').length).to.equal(2);
    }, 0)
  });

  it('should show 0 property after remove the only one saved property', () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainerConnnect />
      </Provider>
    );

    // show saved list
    list.find('.toggle-button').simulate('click');

    // simulate to remove
    list.find('.property-card-wrapper').first().find('.add-remove-button').simulate('click');

    // because saving card is async
    setTimeout(() => {
      expect(list.find('.property-card-wrapper').length).to.equal(0);
    }, 0)
  });

});
