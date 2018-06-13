import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconDiceOne from '../../icons/react-icons/dice-one';
import IconDiceTwo from '../../icons/react-icons/dice-two';
import IconDiceThree from '../../icons/react-icons/dice-three';
import IconDiceFour from '../../icons/react-icons/dice-four';
import IconDiceFive from '../../icons/react-icons/dice-five';
import IconDiceSix from '../../icons/react-icons/dice-six';
import './dice.scss';

const DICE = {
  1: <IconDiceOne />,
  2: <IconDiceTwo />,
  3: <IconDiceThree />,
  4: <IconDiceFour />,
  5: <IconDiceFive />,
  6: <IconDiceSix />,
};
const Dice = ({ isSelected, value }) => (
  <div className={classNames('c-dice', {
    'is-selected': isSelected,
  })}
  >
    {DICE[value]}
  </div>);

Dice.propTypes = {
  isSelected: PropTypes.bool,
  value: PropTypes.number.isRequired,
};

Dice.defaultProps = {
  isSelected: false,
};

export default Dice;
