import Immutable from 'seamless-immutable';
import { TYPES } from './game.actions';

export const INITIAL_STORE = new Immutable({
  currentRoll: [],
  currentlySelected: [],
  previousRolls: [],
  currentScore: 0,
});

export default (state = INITIAL_STORE, { type, payload } = {}) => {
  switch (type) {
    case TYPES.UPDATE_CURRENT_ROLL_VALUES:
      return state.set('currentRoll', payload);
    case TYPES.UPDATE_SELECTED:
      return state.set('currentlySelected', payload);
    default:
      return state;
  }
};
