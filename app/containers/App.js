import React, { Component } from 'react';
import ListPropertyContainer from '../containers/ListPropertyContainer';

class App extends Component {

  // FIXME: this function just for testing purpose
  // it pollutes global variable
  enableDelay = () => {
    window.__deplay = !window.__deplay;
    this.forceUpdate();
  }

  // FIXME: this function just for testing purpose
  // it pollutes global variable
  enableFailure = () => {
    window.__setFailure = !window.__setFailure;
    this.forceUpdate();
  }

  render() {
    return (
      <div className='main-app'>
        <div
          className='button primary-button enable-delay-button'
          onClick={this.enableDelay}>
          {window.__deplay ? 'Disable delay' : 'Enable delay 3s'}
          </div>
          <div
            className='button primary-button enable-failure-button'
            onClick={this.enableFailure}>
            {window.__setFailure ? 'Disable failure' : 'Enable failure'}
            </div>
        <ListPropertyContainer />
      </div>
    );
  }
}

export default App;
