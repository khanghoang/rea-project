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

  it('changes global variable when click SET DELAY button', (done) => {
    const root = mount(<Root />);
    setTimeout(() => {
      root.find('.enable-delay-button').simulate('click');
      setTimeout(() => {
        expect(window.__deplay).to.be.true;
        done();
      }, 0);
    }, 0)
  });

  it('changes global variable when click SET FAILURE button', (done) => {
    const root = mount(<Root />);
    setTimeout(() => {
      root.find('.enable-failure-button').simulate('click');
      setTimeout(() => {
        expect(window.__setFailure).to.be.true;
        done();
      }, 0);
    }, 0)
  });
});
