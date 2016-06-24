import React, { Component } from 'react';
import ListPropertyComponent from '../components/ListPropertyComponent';
import {
  connect
} from 'react-redux';
import {
  fetchPropertyList,
  saveProperty,
  unsaveProperty
} from '../actions/propertyActions';
import {
  bindActionCreators
} from 'redux';
import {
  getSavedProperties,
  getResultProperties
} from '../reducers';
import _ from 'lodash';

function mapStateToProps(state) {
  return {
    savedProperties: getSavedProperties(state),
    resultProperties: getResultProperties(state)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPropertyList,
    saveProperty,
    unsaveProperty
  }, dispatch);
}

class ListPropertyContainer extends Component {

  constructor() {
    super();
    this.state = {
      isShowingSavedOne: false
    }
  }

  componentDidMount() {
    this.fetchListPromise = this.props.fetchPropertyList();
    this.fetchListPromise
    .then(res => {
      return res;
    })
    .finally(() => {
      this && this.forceUpdate();
    })
  }

  toggleShowSaved = () => {
    this.setState({
      isShowingSavedOne: !this.state.isShowingSavedOne
    });
  }

  onClickSave = (propertyID) => {
    this.props.saveProperty(propertyID);
  }

  onClickRemove = (propertyID) => {
    this.props.unsaveProperty(propertyID);
  }

  render() {

    let content = null;
    let switchButtonTitle = 'Show saved properties';
    if (this.state.isShowingSavedOne) {
      switchButtonTitle = 'Show other properties';
      content = (
        <ListPropertyComponent
          properties={ this.props.savedProperties }
          onClickSave={ this.onClickSave }
          onClickRemove={ this.onClickRemove }
          />
      );
    } else {
      content = (
        <ListPropertyComponent
          properties={ this.props.resultProperties }
          onClickSave={ this.onClickSave }
          onClickRemove={ this.onClickRemove }
          />
      )
    }

    return (
      <div>
        <div
          className='toggle-button button primary-button'
          onClick={this.toggleShowSaved}>
          { switchButtonTitle }
        </div>
        { content }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPropertyContainer);
