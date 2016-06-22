import React, { Component } from 'react';
import PropertyCard from '../components/PropertyCard';

export default class ListPropertyComponent extends Component {
  render() {
    const cards = this.props.properties.map(p => {
      return (
        <PropertyCard />
      )
    });

    return (
      <div className='card-container'>
        {cards}
      </div>
    );
  }
}
