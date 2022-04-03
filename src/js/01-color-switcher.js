const CHANGE_COLOR_DELAY = 1000;
let intervalId = null;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};

console.log(refs.stopBtn);

refs.stopBtn.setAttribute('disabled', 'disabled');

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
  refs.startBtn.setAttribute('disabled', 'disabled');
  startColorSwitching();
}

function onStopClick() {
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', 'disabled');

  clearInterval(intervalId);
}

function startColorSwitching() {
  refs.startBtn.setAttribute('disabled', 'disabled');
  refs.stopBtn.removeAttribute('disabled');

  intervalId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, CHANGE_COLOR_DELAY);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
