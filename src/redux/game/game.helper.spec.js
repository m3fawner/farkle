import { expect } from 'chai';
import { scoreDice } from './game.helper';

describe('Game Helper tests', () => {
  describe('#scoreDice', () => {
    it('should score three ones as 1000', () => {

    });

    it('should score three sets of any number other than 1 as 100 * the number', () => {

    });

    it('should score a single one as 100', () => {

    });

    it('should score a single five as 50', () => {

    });

    it('should score a straight as 500', () => {

    });

    it('should score 3 pairs as 1000', () => {

    });

    it('should score a set of non-scoring dice as 0', () => {

    });
  });

  describe('#isHotDice', () => {
    it('should be hot dice if all the dice are selected and each is a part of a scoring set', () => {

    });

    it('should not be hot dice if none of the dice are selected', () => {

    });

    it('should not be hot dice if there are no dice', () => {

    });
  });
});
