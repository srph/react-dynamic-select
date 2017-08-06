# React Dynamic Select
[WIP] Create native `select` elements with dynamic options (usually fetched from AJAX).

## Why?
Autocomplete components like react-select work great, but too heavy for simple use-cases!

## Installation
```
npm i @srph/react-dynamic-select
```

## Usage
```js
import React from 'react';
import DynamicSelect from '@srph/react-dynamic-select';
import axios from 'axios';

class App extends React.Component {
  state = {
    color: ''
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Favorite Color</label>
          <DynamicSelect options={this.options} value={this.state.color} onChange={this.handleChange} />
        </div>
      </div>
    );
  }

  options() {
    axios.get('x').then(res => {
      return res.data.colors;
    });
  }

  handleChange(evt) {
    this.setState({ color: evt.target.value });
  }
}

export default App;
```

## API Documentation
Here's a list of props you may use to customize the component for your use-case: