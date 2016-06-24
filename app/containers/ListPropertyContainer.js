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
import _ from 'lodash';

const convertPropertiesToArray = (properties) => {
  return _.chain(properties)
  .map(p => {
    return p;
  })
  .sortBy(p => {
    return p.id;
  }).value();
}

function mapStateToProps(state) {
  console.log(convertPropertiesToArray(state.properties));
  return {
    properties: convertPropertiesToArray(state.properties)
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

  render() {

    if (!this.props.properties) {
      return null;
    }

    return (
      <div>
        <ListPropertyComponent properties={this.props.properties} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPropertyContainer);
