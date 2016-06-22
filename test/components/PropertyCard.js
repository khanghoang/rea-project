import { mount } from 'enzyme';
import PropertyCard from '../../app/components/PropertyCard';
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import ReactTestUtils from 'react-addons-test-utils';

describe('<PropertyCard />', () => {

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

  describe('with mailformed data', () => {
    const card = mount(<PropertyCard />);

    it('should render agency background with white color as default', () => {
      expect(card.find('.property-card-wrapper').find('.agency-wrapper')).to.have.style('background-color').equal('white');
    });

    it('should render agency logo', () => {
      expect(card.find('.agency-wrapper img')).to.have.attr('src').equal('');
    });

    it('should render property main image', () => {
      expect(card.find('.property-main-image img')).to.have.attr('src').equal('');
    });

    it('should render property information', () => {
      expect(card.find('.property-information span').text()).to.equal('Price: TBD');
    });
  });

  describe('with decent data', () => {
    const agencyPrimaryColor = 'rgb(51, 51, 51)';
    const agencyLogo = 'http://i4.au.reastatic.net/agencylogo/BFERIC/12/20150619122858.gif';
    const mainImage = 'http://i1.au.reastatic.net/640x480/88586227f9176f602d5c19cf06261108dbb29f03e30d1c4ce9fc2b51fb1e4bd6/main.jpg';
    const price = '$123';

    const card = mount(
      <PropertyCard
        agencyPrimaryColor={agencyPrimaryColor}
        agencyLogo={agencyLogo}
        mainImage={mainImage}
        price={price}
      />
    );

    it('should render agency background with color', () => {
      expect(card.find('.property-card-wrapper').find('.agency-wrapper')).to.have.style('background-color').equal(agencyPrimaryColor);
    });

    it('should render agency logo', () => {
      expect(card.find('.agency-wrapper img')).to.have.attr('src').equal(agencyLogo);
    });

    it('should render property main image', () => {
      expect(card.find('.property-main-image img')).to.have.attr('src').equal(mainImage);
    });

    it('should render property information', () => {
      expect(card.find('.property-information span').text()).to.equal(`Price: ${price}`);
    });
  })


});
