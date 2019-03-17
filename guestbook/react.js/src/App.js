import React, { Component } from 'react';
import FormPage from './Form';

class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <center><FormPage /></center>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
