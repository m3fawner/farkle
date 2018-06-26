import { createSelector } from 'reselect';
import { scoreDice } from './game.helper';

const Game = ({ game }) => game;

const CurrentRoll = createSelector(
  [Game],
  ({ currentRoll }) => currentRoll,
);

export const SelectedDice = createSelector(
  [Game],
  ({ currentlySelected }) => currentlySelected,
);

export const CurrentScore = createSelector(
  [Game],
  ({ currentScore }) => currentScore,
);

export const RollScore = createSelector(
  [Game],
  ({ rollScore }) => rollScore,
);

export const NextRollDiceCount = createSelector(
  [Game],
  ({ nextRollDiceCount }) => nextRollDiceCount,
);

export const PreviousRolls = createSelector(
  [Game],
  ({ previousRolls }) => previousRolls,
);

export const CanBank = createSelector(
  [RollScore],
  rollScore => rollScore > 0,
);

export const IsFarkle = createSelector(
  [CurrentRoll],
  currentRoll => scoreDice(currentRoll) === 0,
);
