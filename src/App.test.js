// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import uexpect from '../tests/uexpect';

describe('Render test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('test uexpect', () => {
    uexpect(
      "test",
      'to equal',
      "test"
    );
  });
});
