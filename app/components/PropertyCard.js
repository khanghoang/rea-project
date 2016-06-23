import React, { Component } from 'react';
import _ from 'lodash';

export default class PropertyCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showButton: false
    }
  }

  onMouseEnter = (e) => {
    e.stopPropagation();
    this.setState({showButton: true});
  }

  onMouseLeave = (e) => {
    e.stopPropagation();
    this.setState({showButton: false});
  }

  render() {

    const addOrRemoveButton = (
      <button
        className='button'
        onMouseEnter={this.onMouseEnter}>
        {this.props.isSaved ? 'Remove' : 'Add'}
      </button>
    );

    return (
      <div
        className='property-card-wrapper'
        onClick={this.props.onClick}
        onMouseOver={this.onMouseEnter}
        onMouseOut={this.onMouseLeave} >
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
          {this.state.showButton ? addOrRemoveButton : null}
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
