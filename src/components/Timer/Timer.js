import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  static defaultProps = {
    timerData: {
      hours: 0,
      minutes: 0,
      seconds: 0,
      intervalId: 0,
    },
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
    timerData: PropTypes.shape({
      hours: PropTypes.number,
      minutes: PropTypes.number,
      seconds: PropTypes.number,
      intervalId: PropTypes.number,
    }),
    changeTimer: PropTypes.func.isRequired,
  };

  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    intervalId: 0,
  };

  componentDidMount() {
    // записывает в state данные таймера из props
    const { timerData } = this.props;
    // const {timerData} = item
    this.setState({
      ...timerData,
    });
  }

  // включает таймер
  startTimer = () => {
    const { intervalId } = this.state;

    // очищаем интервал если он уже запущен
    if (intervalId) {
      clearInterval(intervalId);
      this.setState({
        intervalId: 0,
      });
    }

    const newIntervalId = setInterval(() => {
      const { seconds, minutes, hours } = this.state;

      if (seconds < 59) {
        this.setState({
          seconds: seconds + 1,
        });
      } else {
        this.setState({
          minutes: minutes + 1,
          seconds: 0,
        });

        if (minutes < 59) {
          this.setState({
            minutes: minutes + 1,
          });
        } else {
          this.setState({
            hours: hours + 1,
            minutes: 0,
          });
        }
      }
    }, 1000);

    // записываем в intervalId результат выполнения ф-и setInterval
    this.setState({
      intervalId: newIntervalId,
    });
  };

  // останавливает тайме
  stopTimer = () => {
    const { intervalId } = this.state;

    if (intervalId) {
      clearInterval(intervalId);
      this.setState({
        intervalId: 0,
      });
    }

    // при остановке таймера передаем его данные в компонент App
    const { id, changeTimer } = this.props;
    const newTimerData = { ...this.state };
    changeTimer(id, newTimerData);
  };

  // приобразует строки вывода таймера
  strOutput = (val) => {
    const newStr = String(val);
    // eslint-disable-next-line prefer-template
    return newStr.length === 1 ? '0' + newStr : newStr;
  };

  render() {
    const { hours, minutes, seconds } = this.state;

    const secondsOutput = this.strOutput(seconds);
    const minutesOutput = this.strOutput(minutes);
    const hoursOutput = this.strOutput(hours);

    return (
      <span className="description">
        <button className="icon icon-play" type="button" aria-label="icon-play " onClick={this.startTimer} />
        <button className="icon icon-pause" type="button" aria-label="icon-pause" onClick={this.stopTimer} />
        {hoursOutput}:{minutesOutput}:{secondsOutput}
      </span>
    );
  }
}