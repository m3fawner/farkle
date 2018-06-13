import { render } from 'react-dom';
import React from 'react';
import RootContainer from './components/app/app.contextual';
import store from './redux/store';
import i18n from './locales/i18n';

i18n('en-US', () => {
  render(<RootContainer store={store} />, document.getElementById('react-root'));
});
