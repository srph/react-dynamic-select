import React, { Component } from 'react';
import DynamicSelect from './Select';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DynamicSelect options={this.options} />
      </div>
    );
  }

  options() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { value: 1, label: 'Chocolate' },
          { value: 2, label: 'Vanilla' },
          { value: 3, label: 'Avocado' },
        ]);
      }, 2500);
    });
  }
}

export default App;
