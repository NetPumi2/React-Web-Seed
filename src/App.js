// @flow
import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import createRouter from './router';
import configureStore from './redux/configureStore';

const history = createHistory();
const store = configureStore([], history);

type Props = {
};

class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        {createRouter(store, history)}
      </Provider>
    );
  }
}

export default App;
