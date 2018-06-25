export const TYPES = {
  ROLL_DICE: '@@farkle/roll_dice',
  UPDATE_CURRENT_ROLL_VALUES: '@@farkle/update_current_roll_values',
  UPDATE_SELECTED: '@@farkle/update_selected',
};

export const UpdateSelected = selectedArray => ({
  type: TYPES.UPDATE_SELECTED,
  payload: selectedArray,
});

export const UpdateCurrentRollValues = values => ({
  type: TYPES.UPDATE_CURRENT_ROLL_VALUES,
  payload: values,
});

export const RollDice = () => ({
  type: TYPES.ROLL_DICE,
});
