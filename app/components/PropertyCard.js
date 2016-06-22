import React, { Component } from 'react';
import _ from 'lodash';

export default class PropertyCard extends Component {
  render() {
    return (
      <div
        className='property-card-wrapper'
        onClick={this.props.onClick} >
        <div
          className='agency-wrapper'
          style={{backgroundColor: this.props.agencyPrimaryColor || 'white'}}
          >
            <img
              className='agency-logo'
              src={this.props.agencyLogo || ''} />
        </div>
        <div className='property-main-image'>
          <img
            src={this.props.mainImage || ''} />
        </div>
        <div className='property-information'>
          <span>Price: {this.props.price || 'TBD'}</span>
        </div>
      </div>
    )
  }
}

PropertyCard.propTypes = {
  onClick: React.PropTypes.func,
  backgroundColor: React.PropTypes.string,
  agencyLogo: React.PropTypes.string,
  mainImage: React.PropTypes.string,
  price: React.PropTypes.string
}
