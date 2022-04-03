// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/dark.css');

const refs = {
  calendar: document.querySelector('input#datetime-picker'),
  timerStartBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.timerStartBtn.setAttribute('disabled', 'disabled');
refs.timerStartBtn.addEventListener('click', onStartClick);

const options = {
  enableTime: true,
  enableSeconds: true,
  time_24hr: true,
  shorthandCurrentMonth: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCloseFunction(selectedDates[0]);
  },
};

let chosenDate = Date.now();
let intervalId = null;
const initTimer = flatpickr(refs.calendar, options);

function onCloseFunction(date) {
  if (Date.now() > date) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.timerStartBtn.removeAttribute('disabled');
    chosenDate = date;
  }
}

function onStartClick() {
  refs.timerStartBtn.setAttribute('disabled', 'disabled');
  initTimer.destroy();
  refs.calendar.setAttribute('disabled', 'disabled');
  countdownStart();
}

function countdownStart() {
  intervalId = setInterval(() => {
    const restTime = convertMs(chosenDate - Date.now());
    markupTimer(restTime);

    console.log(chosenDate / 100 - Date.now() / 100);
    if (chosenDate - Date.now() <= 0) {
      clearInterval(intervalId);
      markupTimerReset();
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function markupTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function markupTimerReset() {
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
