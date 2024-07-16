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
let timeLeft = 30;
let inBreak = false;
let breakAudio = document.getElementById("breakAudio");
let counter = document.getElementById("counter");
const sessionElement = document.getElementById("sessions");

// Set initial time
counter.textContent = "50:00";

// Display time

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let counterFormatted = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  counter.textContent = counterFormatted;
}

// Start timer

// function start() {
//   if (!isRunning) {
//     isRunning = true;

//     timer = setInterval(() => {
//       if (timeLeft > 0) {
//         timeLeft--;

//         updateTimer();
//       } else {
//         clearInterval(timer);
//         isRunning = false;
//         timeLeft = 0;
//         updateTimer();

//         if (inBreak) {
//           endBreak();
//         } else {
//           sessions++;
//           sessionElement.textContent = sessions;
//           startBreak();
//         }
//       }
//     }, 1000);
//   }
// }

//  function start() {
//   if (!isRunning) {
//     // If the timer isnt currently running, set the isRunning variable to true
//     isRunning = true;

//     /* New variable "lastTime" assigned to Date.now()
//       It returns the number of milliseconds since January 1, 1970. */
//     let lastTime = Date.now();

//     /* Timer variable is a set interval method that will call this function
//       every 1 second or 1000 milliseconds */
//     timer = setInterval(() => {
//       /* New variable "now" assigned to Date.now()
//       It returns the number of milliseconds since January 1, 1970. */
//       let now = Date.now();

//       /* New variable elapsedTime assigned to the output of now - lastTime which are currently both equal to each other.
//       So the output currently would be 0.*/
//       let elapsedTime = now - lastTime;

//       /* timeLeft which is currently set to 3000 seconds/50 minutes or 600 seconds or 10 minutes.
//       elapsedTime / 1000, rounded down is currently 0, because now - lastTime is the same
//       So the output of timeLeft would be the same, 3000 seconds or 600 seconds*/
//       timeLeft -= Math.floor(elapsedTime / 1000);

//       /* now = milliseconds since jan 1st 1970, lastTime would equal the milliseconds since 1970 */
//       lastTime = now;

//       /* If the timeLeft hits 0 seconds left, the interval will stop running, the isRunning variable
//       will be set to false, timeLeft will now be set to 0, the timer will be updated and the sessions will
//       increase by 1 and display. Then, depending on if we are in break or not, the endBreak or startBreak function
//       will be called. If the timeLeft is not 0, the the timer will just keep updating regularly every second.*/
//       if (timeLeft <= 0) {
//         clearInterval(timer);
//         isRunning = false;
//         timeLeft = 0;
//         updateTimer();
//         sessions++;
//         sessionElement.textContent = sessions;
//         inBreak ? endBreak() : startBreak();
//       } else {
//         updateTimer();
//       }
//     }, 1000);
//   }
// }

// Stop/Pause Timer

function stop() {
  clearInterval(timer);
  isRunning = false;
}

// Reset timer

function reset() {
  clearInterval(timer);
  isRunning = false;
  if (inBreak) {
    timeLeft = 600;
  } else {
    timeLeft = 3000;
  }
  updateTimer();
}

// Skip to end of session or break

function skip() {
  if (inBreak) {
    endBreak();
  } else {
    sessions++;
    sessionElement.textContent = sessions;
    startBreak();
  }
}

// Start break timer

function startBreak() {
  /* When the startBreak function is called, the inBreak variable is now true, the time left is now
    600 seconds or 10 minutes. The timer will be updated and the start and playAudio functions will be called. */
  inBreak = true;
  timeLeft = 30;
  updateTimer();
  start();
  playAudio();
}

// End break timer

function endBreak() {
  inBreak = false;
  timeLeft = 30;
  start();
}

// End of session / break audio

function playAudio() {
  breakAudio.volume = 0.05;
  breakAudio.play();
}
