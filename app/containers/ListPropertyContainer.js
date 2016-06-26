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

export class ListPropertyContainer extends Component {

  constructor() {
    super();
    this.state = {
      isShowingSavedOne: false
    }
    this.promises = {};
  }

  componentDidMount() {
    if (!this.props.fetchPropertyList ) {
      return;
    }

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

  componentWillUnmount() {
    _.values(this.promises)
    .forEach(p => p.cancel());
  }

  onClickSave = (propertyID) => {
    const savePromise = this.props.saveProperty(propertyID);
    savePromise.__type = 'add';

    this.promises[`${propertyID}`] = savePromise;
    this && this.forceUpdate();

    savePromise
    .catch(err => {
      console.log('therer is an error');
    })
    .finally(() => {
      // FIXME: need to check if this component is unmounted
      this && this.forceUpdate();
      delete this.promises[`${propertyID}`];
    })
  }

  onClickRemove = (propertyID) => {
    const removePromise = this.props.unsaveProperty(propertyID);
    removePromise.__type = 'remove';

    this.promises[`${propertyID}`] = removePromise;
    this && this.forceUpdate();

    removePromise
    .catch(err => {
      console.log('therer is an error');
    })
    .finally(() => {
      // FIXME: need to check if this component is unmounted
      this && this.forceUpdate();
      delete this.promises[`${propertyID}`];
    })

  }

  render() {

    let content = null;
    let switchButtonTitle = 'Show saved properties';

    const addStatesToArrayProperties = (arr) => {
      return arr.map(p => {
        const promise = this.promises[`${p.id}`];
        if (promise && promise.isPending()) {
          p.title = promise.__type === 'add' ? 'Adding...' : 'Removing...';
          p.disabledButton = true;
        }

        if (promise && promise.isRejected()) {
          p.title = `Oops, ${promise.__type} again?`;
          p.disabledButton = false;
          p.forceShowButton = true;
        }

        return p;
      });
    }

    if (this.state.isShowingSavedOne) {
      switchButtonTitle = 'Show other properties';
      content = (
        <ListPropertyComponent
          properties={ addStatesToArrayProperties(this.props.savedProperties) }
          onClickSave={ this.onClickSave }
          onClickRemove={ this.onClickRemove }
          />
      );
    } else {
      content = (
        <ListPropertyComponent
          properties={ addStatesToArrayProperties(this.props.resultProperties) }
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
