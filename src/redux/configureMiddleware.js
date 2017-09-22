// @flow
import thunkMiddleware from 'redux-thunk';

// $FlowFixMe
const logger = store => next => (action) => {
  // eslint-disable-next-line
  console.log('ACTION', action);
  // eslint-disable-next-line
  console.log('STATE', store.getState());
  return next(action);
};

const configureMiddleware = () => {
  const middleware = [
    thunkMiddleware,
    logger,
  ];
  return middleware;
};

export default configureMiddleware;
