import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

class I18nContext extends React.Component {
  getChildContext() {
    return {
      t: this.props.t,
    };
  }
  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}
I18nContext.childContextTypes = {
  t: PropTypes.func,
};
I18nContext.propTypes = {
  t: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
};

export default translate()(I18nContext);
