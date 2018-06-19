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
});
