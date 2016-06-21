import {
  mount
} from 'enzyme';
import App from '../../app/containers/App';
import { expect } from 'chai';
import React from 'react';

describe('<App />', () => {
  it('should render main app component', () => {
    const app = mount(<App />);
    expect(app.find('.main-app').length).to.be.equal(1);
  });
});
