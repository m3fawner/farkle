import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FarkleGame from './farkleGame';
import { RollDice, UpdateCurrentRollValues, UpdateSelected } from '../../redux/game/game.actions';
import { NextRollDiceCount, SelectedDice } from '../../redux/game/game.selectors';

const mapStateToProps = store => ({
  nextRollDiceCount: NextRollDiceCount(store),
  selected: SelectedDice(store),
});

const mapActionsToTarget = dispatch => bindActionCreators({
  rollDice: RollDice,
  updateCurrentRollValues: UpdateCurrentRollValues,
  updateSelectedValues: UpdateSelected,
}, dispatch);

export default connect(mapStateToProps, mapActionsToTarget)(FarkleGame);
