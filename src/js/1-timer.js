// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');

let userSelectedDate = null;
let timerInterval = null;

button.disabled = true;
button.addEventListener('click', timerStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() < Date.parse(selectedDates[0])) {
      userSelectedDate = selectedDates[0];
      button.disabled = false;
    } else {
      button.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future.',
        position: 'topRight',
      });
    }
  },
};

flatpickr(input, options);

function timerStart() {
  if (timerInterval !== null) return;
  triggersDisable();
  timerInterval = setInterval(() => {
    const resultTime = userSelectedDate - Date.now();

    if (resultTime < 0) {
      stopTimer();
      return;
    }

    updateTimer(convertMs(resultTime));
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

function updateTimer({ days, hours, minutes, seconds }) {
  timer.querySelector('[data-days]').textContent = addLeadingZero(days);
  timer.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  timer.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  timer.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  triggersEnable();
  updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
}

function triggersDisable() {
  button.disabled = true;
  input.disabled = true;
}

function triggersEnable() {
  input.disabled = false;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
