import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import ListPropertyContainer from '../../app/containers/ListPropertyContainer';
import ListPropertyComponent from '../../app/containers/ListPropertyContainer';
import { expect } from 'chai';

import configureStore from '../../app/configureStore';
const store = configureStore();

describe('<ListPropertyContainer />', () => {

  it('should render itself', () => {
    console.log(ListPropertyContainer);
    const list = mount(
      <Provider store={store}>
        <ListPropertyContainer />
      </Provider>
    );
    console.log(list.debug());
    expect(list).to.be.present()
  });

  it('should show loading div while fetching the list properties', () => {

  });
});
