import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FarkleGame from './farkleGame';
import { BankScore, RollDice, UpdateCurrentRollValues, UpdateSelected } from '../../redux/game/game.actions';
import { CanBank, NextRollDiceCount, SelectedDice } from '../../redux/game/game.selectors';

const mapStateToProps = store => ({
  canBank: CanBank(store),
  nextRollDiceCount: NextRollDiceCount(store),
  selected: SelectedDice(store),
});

const mapActionsToTarget = dispatch => bindActionCreators({
  bankScore: BankScore,
  rollDice: RollDice,
  updateCurrentRollValues: UpdateCurrentRollValues,
  updateSelectedValues: UpdateSelected,
}, dispatch);

export default connect(mapStateToProps, mapActionsToTarget)(FarkleGame);
