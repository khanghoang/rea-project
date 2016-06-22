import React, { Component } from 'react';
import ListPropertyComponent from '../components/ListPropertyComponent';

export default class App extends Component {
  render() {
    return (
      <div className='main-app'>
        <ListPropertyComponent properties={[1, 2, 3]}/>
      </div>
    );
  }
}

