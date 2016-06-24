import React, { Component } from 'react';
import _ from 'lodash';

export default class PropertyCard extends Component {

  onClick = (e) => {
    if (!this.props.isSaved) {
      this.props.onClickSave && this.props.onClickSave(this.props.id);
    } else {
      this.props.onClickRemove && this.props.onClickRemove(this.props.id);
    }
  }

  render() {
    const addOrRemoveButton = (
      <div
        className={`add-remove-button button ${this.props.isSaved ? 'remove-button' : 'add-button'}`}
        onClick={this.onClick}>
        {this.props.isSaved ? 'Remove' : 'Add'}
      </div>
    );

    return (
      <div
        className='property-card-wrapper'
        onClick={this.props.onClick}>
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
          { addOrRemoveButton }
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
