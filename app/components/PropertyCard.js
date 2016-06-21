import React, { Component } from 'react';

export default class PropertyCard extends Component {
  render() {
    return (
      <div
        className='property-card-wrapper'
        onClick={this.props.onClick} >
        <div className='agency-wrapper'>
        </div>
        <div className='property-main-image'>
        </div>
        <div className='property-information'>
        </div>
      </div>
    )
  }
}

PropertyCard.propTypes = {
  onClick: React.PropTypes.func
}
