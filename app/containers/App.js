import React, { Component } from 'react';
import ListPropertyContainer from '../containers/ListPropertyContainer';

class App extends Component {
  render() {
    return (
      <div className='main-app'>
        <ListPropertyContainer />
      </div>
    );
  }
}

export default App;
