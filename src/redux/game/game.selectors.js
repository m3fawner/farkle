import { createSelector } from 'reselect';

const Game = ({ game }) => game;
export const SelectedDice = createSelector(
  [Game],
  ({ currentlySelected }) => currentlySelected,
);
