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
});
