import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import ListPropertyContainer from '../../app/containers/ListPropertyContainer';
import ListPropertyComponent from '../../app/containers/ListPropertyContainer';
import { expect } from 'chai';
import PropertyCard from '../../app/components/PropertyCard';

import configureStore from '../../app/configureStore';
const store = configureStore();

describe('<ListPropertyContainer />', () => {

  it('should render itself', () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainer />
      </Provider>
    );
    expect(list).to.be.present()
  });

  it('should show loading div while fetching the list properties', () => {

  });

  it('should show 4 properties after done with fetching', () => {
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainer />
      </Provider>
    );
    expect(list.find('.property-card-wrapper').length).to.equal(4);
  });
});
