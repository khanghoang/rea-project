import React, { Component } from 'react';
import { ListPropertyComponent } from '../components/ListPropertyComponent';
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

function mapStateToProps(state) {
  return {
    listProperties: state.listProperties
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
    this.props.fetchPropertyList()
    .then(res => {
    })
  }

  render() {
    return (
      <div>aaa</div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPropertyContainer);
