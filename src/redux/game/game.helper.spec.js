import { expect } from 'chai';
import { scoreDice, hasScoringDice, isHotDice } from './game.helper';

describe('Game Helper tests', () => {
  describe('#scoreDice', () => {
    it('should score three ones as 1000', () => {
      expect(scoreDice([1, 1, 1])).to.equal(1000);
    });

    it('should score three sets of any number other than 1 as 100 * the number', () => {
      expect(scoreDice([3, 3, 3])).to.equal(300);
    });

    it('should score a single one as 100', () => {
      expect(scoreDice([1])).to.equal(100);
    });

    it('should score a single five as 50', () => {
      expect(scoreDice([5])).to.equal(50);
    });

    it('should score a straight as 500', () => {
      expect(scoreDice([1, 2, 3, 4, 5, 6])).to.equal(500);
    });

    it('should score 3 pairs as 1000', () => {
      expect(scoreDice([1, 1, 2, 2, 3, 3])).to.equal(1000);
    });

    it('should score a set of non-scoring dice as 0', () => {
      expect(scoreDice([2, 4, 3, 4, 2])).to.equal(0);
    });

    it('should score a straight that is less than 6 as 0', () => {
      expect(scoreDice([2, 3, 4])).to.equal(0);
    });
  });

  describe('#hasScoringDice', () => {
    it('should return true when there is a 1', () => {
      expect(hasScoringDice([1, 2, 3, 4, 2, 3])).to.equal(true);
    });
    it('should return true when there is a 5', () => {
      expect(hasScoringDice([5, 2, 3, 4, 2, 3])).to.equal(true);
    });
    it('should return true when there is a 3 of a kind', () => {
      expect(hasScoringDice([2, 2, 3, 4, 2, 3])).to.equal(true);
    });
    it('should return true when there is a straight', () => {
      expect(hasScoringDice([1, 2, 3, 4, 5, 6])).to.equal(true);
    });
    it('should return false when there are no scoring dice', () => {
      expect(hasScoringDice([2, 3, 4, 2, 3])).to.equal(false);
    });
  });

  describe('#isHotDice', () => {
    it('should be hot dice if all the dice are selected and each is a part of a scoring set', () => {
      expect(isHotDice([1])).to.equal(true);
    });

    it('should not be hot dice if none of the dice are selected', () => {
      expect(isHotDice([1], [false])).to.equal(false);
    });
  });
});
