import Immutable from 'seamless-immutable';
import { TYPES } from './game.actions';
import { scoreDice } from './game.helper';

export const INITIAL_STORE = new Immutable({
  currentRoll: [],
  currentlySelected: [],
  previousRolls: [],
  currentScore: 0,
  rollScore: 0,
});

export default (state = INITIAL_STORE, { type, payload } = {}) => {
  switch (type) {
    case TYPES.UPDATE_CURRENT_ROLL_VALUES:
      return state
        .set('rollScore', scoreDice(payload, state.currentlySelected))
        .set('currentRoll', payload);
    case TYPES.UPDATE_SELECTED:
      return state
        .set('currentlySelected', payload)
        .set('rollScore', scoreDice(state.currentRoll, payload));
    default:
      return state;
  }
};
