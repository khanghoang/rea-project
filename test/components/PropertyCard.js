import { mount } from 'enzyme';
import PropertyCard from '../../app/components/PropertyCard';
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import ReactTestUtils from 'react-addons-test-utils';

describe('<PropertyCard />', () => {

  const card = mount(<PropertyCard />);

  it('should render the card', () => {
    expect(card.find('.property-card-wrapper').length).to.be.equal(1);
  });

  it('should render agency', () => {
    expect(card.find('.agency-wrapper').length).to.be.equal(1);
  });

  it('should render property main image', () => {
    expect(card.find('.property-main-image').length).to.be.equal(1);
  });

  it('should render property information', () => {
    expect(card.find('.property-information').length).to.be.equal(1);
  });

  it('should render property information', () => {
    expect(card.find('.property-information').length).to.be.equal(1);
  });

  it('should call callback function when be tapped', () => {
    const cb = spy();
    const propertyCard = mount(
      <PropertyCard
        onClick={cb}
      />
    )

    propertyCard.find('.property-card-wrapper').simulate('click');
    expect(cb.calledOnce).to.be.true;
  });

});
