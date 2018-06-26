import { expect } from 'chai';
import reducer, { INITIAL_STORE } from './game.reducer';
import { TYPES } from './game.actions';
import { scoreDice } from './game.helper';

describe('Game Reducer', () => {
  it('should return the initial store when the store is undefined', () => {
    expect(reducer(undefined, {
      type: 'test_action',
    })).to.equal(INITIAL_STORE);
  });

  describe('#ROLL_DICE', () => {
    const TEST_STATE = INITIAL_STORE
      .set('currentRoll', [1, 5, 2])
      .set('currentlySelected', [true, true, false])
      .set('rollScore', 150);
    it('should add the current roll to the previous rolls', () => {
      expect(reducer(TEST_STATE, {
        type: TYPES.ROLL_DICE,
      }).previousRolls).to.deep.equal([{
        score: 150,
        rollNumber: 0,
        values: [1, 5],
      }]);
    });

    it('should lower the number of dice for the next roll based on the selected values', () => {
      expect(reducer(TEST_STATE, {
        type: TYPES.ROLL_DICE,
      }).nextRollDiceCount).to.equal(1);
    });
  });

  describe('#BANK_SCORE', () => {
    const TEST_STATE = INITIAL_STORE
      .set('rollScore', 150)
      .set('farkleCount', 1);
    const WITH_PREVIOUS_ROLLS = TEST_STATE.set('previousRolls', [{
      score: 150,
    }, {
      score: 100,
    }]);

    it('should update the current score with the rollScore if that is the only roll', () => {
      expect(reducer(TEST_STATE, {
        type: TYPES.BANK_SCORE,
      }).currentScore).to.equal(150);
    });

    it('should update the current score with the current rollScore and also any previous roll values', () => {
      expect(reducer(WITH_PREVIOUS_ROLLS, {
        type: TYPES.BANK_SCORE,
      }).currentScore).to.equal(400);
    });

    it('should reset the previous rolls to be an empty array', () => {
      expect(reducer(WITH_PREVIOUS_ROLLS, {
        type: TYPES.BANK_SCORE,
      }).previousRolls).to.deep.equal([]);
    });

    it('should reset the farkleCount to 0', () => {
      expect(reducer(TEST_STATE, {
        type: TYPES.BANK_SCORE,
      }).farkleCount).to.equal(0);
    });
  });

  describe('#LOG_FARKLE', () => {
    const ONE_SHY = INITIAL_STORE
      .set('farkleCount', 2)
      .set('nextRollDiceCount', 3)
      .set('currentScore', 1000);
    it('should increment the farkle count', () => {
      expect(reducer(INITIAL_STORE, {
        type: TYPES.LOG_FARKLE,
      }).farkleCount).to.equal(1);
    });
    it('should reset the farkle count to 0', () => {
      expect(reducer(ONE_SHY, {
        type: TYPES.LOG_FARKLE,
      }).farkleCount).to.equal(0);
    });
    it('should subtract 1000 from the score, as a penalty for getting 3 farkles', () => {
      expect(reducer(ONE_SHY, {
        type: TYPES.LOG_FARKLE,
      }).currentScore).to.equal(0);
    });

    it('should not subtract 1000 from the score if one farkle is logged', () => {
      expect(reducer(INITIAL_STORE, {
        type: TYPES.LOG_FARKLE,
      }).currentScore).to.equal(0);
    });

    it('should reset the number of rolling dice', () => {
      expect(reducer(ONE_SHY, {
        type: TYPES.LOG_FARKLE,
      }).nextRollDiceCount).to.equal(INITIAL_STORE.nextRollDiceCount);
    });
  });

  describe('#UPDATE_SELECTED', () => {
    it('should assign the payload onto the store at `currentlySelected`', () => {
      expect(reducer(INITIAL_STORE, {
        type: TYPES.UPDATE_SELECTED,
        payload: [true],
      }).currentlySelected).to.deep.equal([true]);
    });

    it('should score the selected dice', () => {
      const TEST_STATE = INITIAL_STORE.set('currentRoll', [1]);
      expect(reducer(TEST_STATE, {
        type: TYPES.UPDATE_SELECTED,
        payload: [true],
      }).rollScore).to.equal(scoreDice([1]));
    });
  });

  describe('#UPDATE_CURRENT_ROLL_VALUES', () => {
    it('should assign the payload onto the store at `currentRoll`', () => {
      expect(reducer(INITIAL_STORE, {
        type: TYPES.UPDATE_CURRENT_ROLL_VALUES,
        payload: [1],
      }).currentRoll).to.deep.equal([1]);
    });

    it('should score the selected dice', () => {
      const TEST_STATE = INITIAL_STORE.set('currentlySelected', [true]);
      expect(reducer(TEST_STATE, {
        type: TYPES.UPDATE_CURRENT_ROLL_VALUES,
        payload: [1],
      }).rollScore).to.equal(scoreDice([1]));
    });
  });
});
