import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FarkleGame from './farkleGame';

const mapStateToProps = () => ({});

const mapActionsToTarget = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapActionsToTarget)(FarkleGame);
