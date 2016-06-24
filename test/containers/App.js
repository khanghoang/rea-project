import {
  mount
} from 'enzyme';
import Root from '../../app/containers/Root';
import { expect } from 'chai';
import React from 'react';

describe('<Root />', () => {
  it('should render main app component', () => {
    const root = mount(<Root />);
    expect(root.find('.main-app')).to.exist;
  });
});
