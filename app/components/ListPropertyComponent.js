import React, { Component } from 'react';
import PropertyCard from '../components/PropertyCard';
import _ from 'lodash';

export default class ListPropertyComponent extends Component {
  render() {
    const { properties, ...rest } = this.props;
    const cards = this.props.properties.map(p => {
      return (
        <PropertyCard
          key={p.id}
          agencyPrimaryColor={_.get(p, 'agency.brandingColors.primary', 'white')}
          mainImage={_.get(p, 'mainImage', '')}
          agencyLogo={_.get(p, 'agency.logo', '')}
          price={_.get(p, 'price', 'TBD')}
          id={p.id}
          isSaved={p.saved}
          {...rest}
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
