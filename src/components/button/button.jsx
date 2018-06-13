import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

const Button = ({ children, ...props }) => (
  <button className="c-button" {...props}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Button;
