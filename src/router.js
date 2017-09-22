// @flow
import React from 'react';
import type { Store } from 'redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Switch from 'react-router-dom/es/Switch';
import Header from './components/header/header';
import RightRouteMenu from './components/rightRouteMenu/rightRouteMenu';

const routeMain = () => (
  <div>routeMain - This is component on route /</div>
);

const routeIndex = () => (
  <div>This is component on route /index</div>
);

const routeKoko = () => (
  <div>
    Maecenas luctus dictum condimentum. Donec non finibus erat. Praesent lobortis a lectus et
    tincidunt. Morbi fringilla nisl vel est eleifend dapibus. Maecenas ullamcorper ullamcorper
    interdum.
    Mauris eget lacus vehicula, gravida eros in, mollis nunc. Nulla vel felis condimentum, mollis
     massa et,
    scelerisque nibh. Nam viverra consectetur felis at pulvinar. Aenean non ultrices nunc.
    Suspendisse facilisis laoreet elementum. Sed tincidunt lacinia augue, tincidunt molestie diam
    euismod sit amet.
    Mauris tempor augue vel augue convallis, et pretium nulla porta. Aliquam vel justo quis nisl
    condimentum ultrices.
    Vestibulum consectetur ligula vitae pellentesque commodo. Vivamus semper porttitor erat, a
    rhoncus massa congue in.
  </div>
);

export default function createRouter(store: Store, history: any) {
  return (
    <ConnectedRouter history={history} store={store}>
      <div>
        <Header />
        <Switch>
          <Route
            path="/"
            component={routeMain}
            exact
          />
          <Route
            path="/index"
            component={routeIndex}
          />
          <Route
            path="/koko"
            component={routeKoko}
          />
        </Switch>
        <RightRouteMenu />
      </div>
    </ConnectedRouter>
  );
}
