import React, { Component } from 'react';
import PropertyCard from '../components/PropertyCard';
import _ from 'lodash';

export default class ListPropertyComponent extends Component {
  render() {
    const cards = this.props.properties.map(p => {
      return (
        <PropertyCard
          key={p.id}
          agencyPrimaryColor={_.get(p, 'agency.brandingColors.primary', 'white')}
          mainImage={_.get(p, 'mainImage', '')}
          agencyLogo={_.get(p, 'agency.logo', '')}
          price={_.get(p, 'price', 'TBD')}
          />
      )
    });

    return (
      <div className='card-container'>
        {cards}
      </div>
    );
  }
}
