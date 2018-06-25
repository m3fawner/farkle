import { createSelector } from 'reselect';

const Game = ({ game }) => game;
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
