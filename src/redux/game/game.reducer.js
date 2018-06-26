import Immutable from 'seamless-immutable';
import { TYPES } from './game.actions';
import { scoreDice } from './game.helper';

export const INITIAL_STORE = new Immutable({
  currentRoll: [],
  currentlySelected: [],
  previousRolls: [],
  currentScore: 0,
  rollScore: 0,
  isFarkleRoll: false,
  nextRollDiceCount: 6,
  farkleCount: 0,
});

const getCurrentlySelectedValues = (values, selected) =>
  values.reduce((prev, curr, i) => (selected[i] ? prev.concat(curr) : prev), []);

export default (state = INITIAL_STORE, { type, payload } = {}) => {
  switch (type) {
    case TYPES.ROLL_DICE:
      return state
        .update('previousRolls', previousRolls => previousRolls.concat({
          rollNumber: previousRolls.length,
          score: state.rollScore,
          values: getCurrentlySelectedValues(state.currentRoll, state.currentlySelected),
        }))
        .set('nextRollDiceCount', state.currentRoll.length - state.currentlySelected.filter(selected => selected).length);
    case TYPES.BANK_SCORE:
      return state
        .update('currentScore', currentScore => currentScore
          + state.previousRolls.reduce((prev, curr) => prev + curr.score, 0)
          + state.rollScore)
        .set('previousRolls', INITIAL_STORE.previousRolls)
        .set('nextRollDiceCount', INITIAL_STORE.nextRollDiceCount)
        .set('farkleCount', 0);
    case TYPES.UPDATE_CURRENT_ROLL_VALUES:
      return state
        .set('rollScore', scoreDice(payload, state.currentlySelected))
        .set('currentRoll', payload);
    case TYPES.UPDATE_SELECTED:
      return state
        .set('currentlySelected', payload)
        .set('rollScore', scoreDice(state.currentRoll, payload));
    case TYPES.LOG_FARKLE: {
      const updatedFarkleCount = state.update('farkleCount', count => count + 1);
      return updatedFarkleCount
        .update('farkleCount', count => count % 3)
        .update('currentScore', score => (updatedFarkleCount.farkleCount === 3 ? score - 1000 : score))
        .set('nextRollDiceCount', INITIAL_STORE.nextRollDiceCount);
    }
    default:
      return state;
  }
};
