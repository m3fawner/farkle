import { expect } from 'chai';
import reducer, { INITIAL_STORE } from './game.reducer';
import { TYPES } from './game.actions';

describe('Game Reducer', () => {
  it('should return the initial store when the store is undefined', () => {
    expect(reducer(undefined, {
      type: 'test_action',
    })).to.equal(INITIAL_STORE);
  });

  describe('#UPDATE_SELECTED', () => {
    it('should assign the payload onto the store at `currentlySelected`', () => {
      expect(reducer(INITIAL_STORE, {
        type: TYPES.UPDATE_SELECTED,
        payload: [true],
      }).currentlySelected).to.deep.equal([true]);
    });
  });

  describe('#UPDATE_CURRENT_ROLL_VALUES', () => {
    it('should assign the payload onto the store at `currentRoll`', () => {
      expect(reducer(INITIAL_STORE, {
        type: TYPES.UPDATE_CURRENT_ROLL_VALUES,
        payload: [1],
      }).currentRoll).to.deep.equal([1]);
    });
  });
});
