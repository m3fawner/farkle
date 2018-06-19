export const TYPES = {
  UPDATE_SELECTED: '@@farkle/update_selected',
};

export const UpdateSelected = selectedArray => ({
  type: TYPES.UPDATE_SELECTED,
  payload: selectedArray,
});
