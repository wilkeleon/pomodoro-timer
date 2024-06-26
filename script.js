// Light Mode / Dark Mode

const body = document.getElementById("body");
const dark = document.getElementById("darkmode");
const light = document.getElementById("lightmode");
const darkSkip = document.getElementById("skip");
const lightSkip = document.getElementById("lightSkip");

function darkmode() {
  body.classList.add("dark-mode");
  dark.style.display = "none";
  light.style.display = "block";
  darkSkip.style.display = "none";
  lightSkip.style.display = "block";
}

function lightmode() {
  body.classList.remove("dark-mode");
  dark.style.display = "block";
  light.style.display = "none";
  darkSkip.style.display = "block";
  lightSkip.style.display = "none";
}

// Variables

let timer;
let count = 0;
let sessions = 0;
let isRunning = false;
let timeLeft = 3000;
let inBreak = false;
let breakAudio = document.getElementById("breakAudio");

let counter = document.getElementById("counter");
counter.textContent = "50:00";

const sessionElement = document.getElementById("sessions");
// Functions

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let counterFormatted = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  counter.textContent = counterFormatted;
}

function start() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft === 0) {
        clearInterval();
        sessions++;
        sessionElement.textContent = sessions;
        breakTime();
      }
    }, 1000);
  }
}

function stop() {
  clearInterval(timer);
  isRunning = false;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  if (inBreak) {
    timeLeft = 600;
    updateTimer();
  } else {
    timeLeft = 3000;
    updateTimer();
  }
}

function skip() {
  if (inBreak) {
    inBreak = false;
    reset();
    start();
  } else {
    sessions++;
    sessionElement.textContent = sessions;
    breakTime();
  }
}

function breakTime() {
  timeLeft = 600;
  inBreak = true;
  updateTimer();
  start();
  playAudio();
}

function playAudio() {
  breakAudio.volume = 0.2;
  breakAudio.play();
}
