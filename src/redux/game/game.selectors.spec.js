import { expect } from 'chai';
import Immutable from 'seamless-immutable';
import * as selectors from './game.selectors';
import { INITIAL_STORE } from './game.reducer';

const SPEC_STORE = new Immutable({})
  .set('game', INITIAL_STORE);
describe('Game Selectors', () => {
  describe('#SelectedDice', () => {
    it('should return the currentlySelected property from the store', () => {
      expect(selectors.SelectedDice(SPEC_STORE)).to.equal(INITIAL_STORE.currentlySelected);
    });
  });

  describe('#CurrentScore', () => {
    it('should return the currentScore property from the store', () => {
      expect(selectors.CurrentScore(SPEC_STORE)).to.equal(INITIAL_STORE.currentScore);
    });
  });

  describe('#RollScore', () => {
    it('should return the rollScore property from the store', () => {
      expect(selectors.RollScore(SPEC_STORE)).to.equal(INITIAL_STORE.rollScore);
    });
  });

  describe('#NextRollDiceCount', () => {
    it('should return the nextRollDiceCount property from the store', () => {
      expect(selectors.NextRollDiceCount(SPEC_STORE)).to.equal(INITIAL_STORE.nextRollDiceCount);
    });
  });

  describe('#PreviousRolls', () => {
    it('should return the previousRolls property from the store', () => {
      expect(selectors.PreviousRolls(SPEC_STORE)).to.equal(INITIAL_STORE.previousRolls);
    });
  });

  describe('#CanBank', () => {
    it('should return true if the score is above 0', () => {
      const TEST_STORE = SPEC_STORE.setIn(['game', 'rollScore'], 150);
      expect(selectors.CanBank(TEST_STORE)).to.be.true;
    });
    it('should return false if the store is 0', () => {
      const TEST_STORE = SPEC_STORE.set('rollScore', 0);
      expect(selectors.CanBank(TEST_STORE)).to.be.false;
    });
  });
});
