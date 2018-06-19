import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FarkleGame from './farkleGame';
import { UpdateCurrentRollValues, UpdateSelected } from '../../redux/game/game.actions';
import { SelectedDice } from '../../redux/game/game.selectors';

const mapStateToProps = store => ({
  selected: SelectedDice(store),
});

const mapActionsToTarget = dispatch => bindActionCreators({
  updateCurrentRollValues: UpdateCurrentRollValues,
  updateSelectedValues: UpdateSelected,
}, dispatch);

export default connect(mapStateToProps, mapActionsToTarget)(FarkleGame);
