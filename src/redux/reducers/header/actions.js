// @flow
export type HeaderListAction
  = { type: 'HEADER.UP' }
  | { type: 'HEADER.DOWN' }
  ;

export const headerUp = () => ({
  type: 'HEADER.UP',
  payload: {},
});

export const headerDown = () => ({
  type: 'HEADER.DOWN',
  payload: {},
});
