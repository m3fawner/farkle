import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Application from './app';
import browserHistory from './browserHistory';

const mapStateToProps = () => ({
  browserHistory,
});
const mapActionsToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(Application);
