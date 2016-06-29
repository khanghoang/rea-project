import {
  mount
} from 'enzyme';
import Root from '../../app/containers/Root';
import { expect } from 'chai';
import React from 'react';
import sleep from '../utils/sleep';

describe('<Root />', () => {
  it('should render main app component', () => {
    const root = mount(<Root />);
    expect(root.find('.main-app')).to.exist;
  });

  it('changes global variable when click SET DELAY button', async () => {
    const root = mount(<Root />);

    await sleep();
    root.find('.enable-delay-button').simulate('click');

    await sleep();
    expect(window.__deplay).to.be.true;
  });

  it('changes global variable when click SET FAILURE button', async () => {
    const root = mount(<Root />);

    await sleep();
    root.find('.enable-failure-button').simulate('click');

    await sleep();
    expect(window.__setFailure).to.be.true;
  });
});
