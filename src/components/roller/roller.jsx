import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/button';
import Dice from '../dice/dice';
import IconDice from '../../icons/react-icons/dice';
import IconPiggyBank from '../../icons/react-icons/piggy-bank';
import LocaleKeys from '../../locales/keys';
import './roller.scss';

const generateValues = (numberOfValues) => {
  const values = [];
  for (let i = 0; i < numberOfValues; i += 1) {
    values.push(Math.floor(Math.random() * 6) + 1);
  }
  return values;
};
class Roller extends React.PureComponent {
  state = {
    firstRoll: true,
    isRolling: false,
    selected: [],
    values: [],
  }
  componentDidMount() {
    this.props.updateCurrentRollValues(this.state.values);
  }
  static getDerivedStateFromProps({ numberOfDice }, { values }) {
    if (numberOfDice !== values.length) {
      const newValues = generateValues(numberOfDice);
      return {
        firstRoll: true,
        selected: Array.from(new Array(6)).map(() => false),
        values: newValues,
      };
    }
    return null;
  }
  get hasSelectedDice() {
    return this.state.selected.includes(true);
  }
  rerollDice = () => {
    this.setState({
      selected: Array.from(new Array(6)).map(() => false),
      values: generateValues(this.props.numberOfDice),
    });
  }
  rollDice = () => {
    this.setState({
      firstRoll: false,
      isRolling: true,
    }, () => {
      for (let i = 0; i < Math.floor(this.props.rollingTime * 10); i += 1) {
        setTimeout(this.rerollDice, i * 100);
      }
      setTimeout(() => {
        this.setState({
          isRolling: false,
        });
        this.props.updateCurrentRollValues(this.state.values);
      }, this.props.rollingTime * 1000);
    });
  }
  selectDice = (index) => {
    const selected = Array.from(this.state.selected);
    selected[index] = !selected[index];
    this.setState({
      selected,
    });
    this.props.updateSelectedValues(selected);
  }
  render() {
    const { firstRoll, isRolling, values } = this.state;
    const { bankPoints } = this.props;
    const { t } = this.context;
    return (
      <div className="c-roller">
        {values.map((val, index) => (
          <Button
            onClick={() => this.selectDice(index)}
            key={Math.random()}
          >
            <Dice
              isSelected={this.state.selected[index]}
              value={val}
            />
          </Button>))}
        <Button
          onClick={this.rollDice}
          disabled={isRolling || (firstRoll && !this.hasSelectedDice)}
          title={t(LocaleKeys.ROLL_DICE)}
        >
          <IconDice />
        </Button>
        <Button
          onClick={bankPoints}
          disabled={!this.canBank}
          title={this.canBank ? t(LocaleKeys.BANK_POINTS) : t(LocaleKeys.BANK_POINTS_DISABLED)}
        >
          <IconPiggyBank />
        </Button>
      </div>
    );
  }
}

Roller.propTypes = {
  bankPoints: PropTypes.func.isRequired,
  numberOfDice: PropTypes.number.isRequired,
  rollingTime: PropTypes.number,
  updateCurrentRollValues: PropTypes.func.isRequired,
  updateSelectedValues: PropTypes.func.isRequired,
};

Roller.defaultProps = {
  rollingTime: 2,
};

Roller.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default Roller;
