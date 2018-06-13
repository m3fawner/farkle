import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import browserHistory from '../components/app/browserHistory';
import reducer from './combinedReducers';

const logger = createLogger({
  diff: true,
});
const middleWare = applyMiddleware(
  thunk,
  logger,
  routerMiddleware(browserHistory),
);
export default createStore(reducer, middleWare);
