import { render } from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import RootContainer from './components/app/app.contextual';
import store from './redux/store';
import reducers from './redux/combinedReducers';
import './index';

const renderComponent = (ToRender) => {
  render(
    <AppContainer>
      <ToRender />
    </AppContainer>,
    document.getElementById('react-root'),
  );
};

if (module.hot) {
  module.hot.accept('./components/app/app.contextual', () => {
    renderComponent(RootContainer);
  });
  module.hot.accept('./redux/combinedReducers', () => {
    store.replaceReducer(reducers);
  });
}
