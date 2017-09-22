// @flow
import { combineReducers } from 'redux';
import headerReducer from './reducers/header/reducer';

export const reducerMap = {
  header: headerReducer,
};

const configureReducer = (platformReducers?: any = {}) => {
  const rootReducer = combineReducers({ ...reducerMap, ...platformReducers });

  return rootReducer;
};

export default configureReducer;
