import Immutable from 'seamless-immutable';
/**
 * 5 - 50
 * 1 - 100
 * 1,1,1 - 1000
 * n[2-5]{3} - n * 100
 * 1,2,3,4,5,6 - 500
 * 2,2,3,3,4,4 - 1000
 *
 * @param {Array[number]} dice | Integer collection of dice values
 */
const SCORING_BASE_OBJECT = new Immutable({
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
});

const extractScoringObject = (dice, selected) => {
  const selectedDice = dice.reduce((prev, curr, i) => (selected[i] ? prev.concat(curr) : prev), []);
  const sorted = selectedDice.sort((a, b) => a - b);
  const score = sorted.reduce((prev, curr) =>
    prev.update(curr, val => val + 1), SCORING_BASE_OBJECT);
  return score;
};

export const scoreDice = (dice, selected = Array.from(new Array(dice.length)).map(() => true)) => {
  const score = extractScoringObject(dice, selected);
  let scoreTotal = 0;
  Object.keys(score).forEach((key) => {
    switch (key) {
      case '1':
        scoreTotal += (Math.floor(score[key] / 3) * 1000) + ((score[key] % 3) * 100);
        break;
      case '5':
        scoreTotal += (Math.floor(score[key] / 3) * 500) + ((score[key] % 3) * 50);
        break;
      case '2':
      case '3':
      case '4':
      case '6':
        if (score[key] >= 3) {
          scoreTotal += Math.floor(score[key] / 3) * (Number.parseInt(key, 10) * 100);
        }
        break;
      default:
        break;
    }
  });
  // Straight and All Pairs Check
  const nonZeroCounts = Object.values(score)
    .filter(num => num > 0);
  if (nonZeroCounts.length === 6) {
    scoreTotal = 500;
  } else if (dice.length === 6 && nonZeroCounts.length === 3) {
    scoreTotal = 1000;
  }
  return scoreTotal;
};

export const hasScoringDice = dice => scoreDice(dice) > 0;

export const isHotDice = (dice, selected = Array.from(new Array(dice.length)).map(() => true)) => {
  if (selected.includes(false)) {
    return false;
  }
  let score = extractScoringObject(dice, selected);
  // Straight and All Pairs Check
  const nonZeroCounts = Object.values(score)
    .filter(num => num > 0);
  if (nonZeroCounts.length === 6 || (dice.length === 6 && nonZeroCounts.length === 3)) {
    return true;
  }
  Object.keys(score).forEach((key) => {
    switch (key) {
      case '1':
      case '5':
        score = score.set(key, 0);
        break;
      case '2':
      case '3':
      case '4':
      case '6':
        score = score.update(key, count => count % 3);
        break;
      default:
        break;
    }
  });
  return Object.values(score).reduce((prev, curr) => (curr > 0 ? false : prev), true);
};

