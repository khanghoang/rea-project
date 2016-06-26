import React, { Component } from 'react';
import _ from 'lodash';
import classnames from 'classnames';

export default class PropertyCard extends Component {

  onClick = (e) => {
    if (!this.props.isSaved) {
      this.props.onClickSave && this.props.onClickSave(this.props.id);
    } else {
      this.props.onClickRemove && this.props.onClickRemove(this.props.id);
    }
  }

  render() {
    const addOrRemoveButton = () => {
      const classes = classnames(
        "add-remove-button button",
        {
          'remove-button': this.props.isSaved,
          'add-button': !this.props.isSaved,
          'button-disable': this.props.disabledButton,
          'force-visible': this.props.forceShowButton
        }
      );

      let title = this.props.isSaved ? 'Remove' : 'Add';
      if (this.props.title) {
        title = this.props.title;
      }

      return (
        <div
          className={classes}
          onClick={this.onClick}>
          {title}
        </div>
      )
    }

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
          { this.props.showButton ? addOrRemoveButton() : null}
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
  price: React.PropTypes.string,
  showButton: React.PropTypes.bool,
  buttonTitle: React.PropTypes.string,
  disabledButton: React.PropTypes.bool
}

PropertyCard.defaultProps = {
  showButton: true,
  disabledButton: false
}
