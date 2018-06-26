import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
    values: [],
  }
  componentDidMount() {
    this.props.updateCurrentRollValues(this.state.values);
    this.props.updateSelectedValues(Array.from(new Array(this.props.nextRollDiceCount))
      .map(() => false));
  }
  static getDerivedStateFromProps({ nextRollDiceCount }, { values }) {
    if (nextRollDiceCount !== values.length) {
      const newValues = generateValues(nextRollDiceCount);
      return {
        firstRoll: true,
        values: newValues,
      };
    }
    return null;
  }
  get hasSelectedDice() {
    return this.props.selected.includes(true);
  }
  performRoll = () => {
    this.setState({
      values: generateValues(this.props.nextRollDiceCount),
    });
  }
  rerollDice = () => {
    this.props.updateSelectedValues(Array.from(new Array(this.props.nextRollDiceCount))
      .map(() => false));
    this.setState({
      firstRoll: false,
      isRolling: true,
    }, () => {
      for (let i = 0; i < Math.floor(this.props.rollingTime * 10); i += 1) {
        setTimeout(this.performRoll, i * 100);
      }
      setTimeout(() => {
        this.setState({
          isRolling: false,
        });
        this.props.updateCurrentRollValues(this.state.values);
      }, this.props.rollingTime * 1000);
    });
  }
  rollDice = () => {
    this.props.rollDice();
    this.rerollDice();
  }
  selectDice = (index) => {
    const selected = Array.from(this.props.selected);
    selected[index] = !selected[index];
    this.props.updateSelectedValues(selected);
  }
  bankScore = () => {
    this.props.bankScore();
    this.rerollDice();
  }
  rollFarkle = () => {
    this.props.logFarkle();
    this.rerollDice();
  }
  render() {
    const { firstRoll, isRolling, values } = this.state;
    const { canBank, isFarkle } = this.props;
    const { t } = this.context;
    return (
      <div className="c-roller">
        {isFarkle && <button className="c-roller__farkle-message c-button" onClick={this.rollFarkle}>{t(LocaleKeys.FARKLE)}</button>}
        <div className={classnames('c-roller__options', {
          'is-farkle': isFarkle,
        })}
        >
          {values.map((val, index) => (
            <Button
              onClick={() => this.selectDice(index)}
              key={Math.random()}
            >
              <Dice
                isSelected={this.props.selected[index]}
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
            onClick={this.bankScore}
            disabled={!canBank}
            title={t(canBank ? LocaleKeys.BANK_POINTS : LocaleKeys.BANK_POINTS_DISABLED)}
          >
            <IconPiggyBank />
          </Button>
        </div>
      </div>
    );
  }
}

Roller.propTypes = {
  bankScore: PropTypes.func.isRequired,
  canBank: PropTypes.bool.isRequired,
  isFarkle: PropTypes.bool.isRequired,
  logFarkle: PropTypes.func.isRequired,
  nextRollDiceCount: PropTypes.number.isRequired,
  rollDice: PropTypes.func.isRequired,
  rollingTime: PropTypes.number,
  selected: PropTypes.arrayOf(PropTypes.bool).isRequired,
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
