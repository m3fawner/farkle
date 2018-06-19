import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import game from './game/game.reducer';

export default combineReducers({
  game,
  router,
});
