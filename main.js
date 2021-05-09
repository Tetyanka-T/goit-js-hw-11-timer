class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(selector);
    this.targetDate = targetDate;

    this.refs = {
      days: this.selector.querySelector('[data-value="days"]'),
      hours: this.selector.querySelector('[data-value="hours"]'),
      mins: this.selector.querySelector('[data-value="mins"]'),
      secs: this.selector.querySelector('[data-value="secs"]'),
    };
  }

  startTimer = () => {
    this.intervalId = setInterval(() => {
      const timeDiff = this.getDiffTime();
      const timeOpts = this.getTime(timeDiff);
      this.renderTimerData(timeOpts);
      if (!Math.floor(timeDiff / 1000)) {
        this.stopTimer();
      }
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.intervalId);
    this.intervalId = null;
  };

  getDiffTime = () => this.targetDate - Date.now();

  getDays = (time) => Math.floor(time / (1000 * 60 * 60 * 24));
  getHours = (time) =>
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  getMins = (time) => Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  getSecs = (time) => Math.floor((time % (1000 * 60)) / 1000);

  getTime = (time) => {
    return {
      days: this.getDays(time),
      hours: this.getHours(time),
      mins: this.getMins(time),
      secs: this.getSecs(time),
    };
  };
  renderTimerData = (timeOpts) => {
    const { days, hours, mins, secs } = timeOpts;
    this.refs.days.textContent = days;
    this.refs.hours.textContent = hours < 10 ? `0${hours}` : hours;
    this.refs.mins.textContent = mins < 10 ? `0${mins}` : mins;
    this.refs.secs.textContent = secs < 10 ? `0${secs}` : secs;
  };
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2021"),
});

timer.startTimer();
