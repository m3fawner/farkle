import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Scoring from './scoring';
import { CurrentScore, RollScore } from '../../redux/game/game.selectors';

const mapStateToProps = store => ({
  currentScore: CurrentScore(store),
  rollScore: RollScore(store),
});

const mapActionsToTarget = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapActionsToTarget)(Scoring);
