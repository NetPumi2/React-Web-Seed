// @flow
import type { HeaderListAction } from './actions';

export type HeaderState = {
  count: number,
};

const INITIAL_STATE = {
  count: 0,
};

const headerReducer = (state?: HeaderState = INITIAL_STATE, action: HeaderListAction) => {
  switch ((action).type) {
    case 'HEADER.UP': {
      const up = state.count + 1;
      return {
        ...state,
        count: up,
      };
    }
    case 'HEADER.DOWN': {
      const down = state.count - 1;
      return {
        ...state,
        count: down,
      };
    }
    default: {
      return state;
    }
  }
};

// - selectors - //
export const getHeader = (state: HeaderState) => {
  const headerReducerState = state || INITIAL_STATE;
  return headerReducerState;
};

export const getCount = (state: HeaderState) => {
  const countValue = getHeader(state).count;
  return countValue;
};

export default headerReducer;
