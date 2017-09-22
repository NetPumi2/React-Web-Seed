// @flow
import uexpect from '../../../../../tests/uexpect';
import { headerUp, headerDown } from '../actions';

describe('User Actions', () => {
  it('headerUp() should create HEADER.UP action', () => {
    uexpect(
      headerUp(),
      'to satisfy',
      {
        type: 'HEADER.UP',
        payload: {},
      },
    );
  });
  it('headerDown() should create HEADER.DOWN action', () => {
    uexpect(
      headerDown(),
      'to satisfy',
      {
        type: 'HEADER.DOWN',
        payload: {},
      },
    );
  });
});
