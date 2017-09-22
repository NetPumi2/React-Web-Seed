// @flow
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import configureMiddleware from './configureMiddleware';
import configureReducer from './configureReducer';

const middleware = configureMiddleware();
const rootReducer = configureReducer({
  router: routerReducer,
});

const configureStore = (moreMiddleware: Array<any>, history: any) => {
  const createStoreWithMiddleware = applyMiddleware(...[
    routerMiddleware(history),
    ...moreMiddleware,
    ...middleware,
  ])(createStore);

  return createStoreWithMiddleware(
    combineReducers({
      rootReducer,
    }),
    devToolsEnhancer(),
  );
};

export default configureStore;
