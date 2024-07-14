document.addEventListener("DOMContentLoaded", () => {
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

  function start() {
    if (isRunning === false) {
      // If the timer isnt currently running, set the isRunning variable to true
      isRunning = true;

      /* New vairable "lastTime" assigned to Date.now() 
      It returns the number of milliseconds since January 1, 1970. */
      let lastTime = Date.now();

      /* Timer variable is a set interval method that will call this function 
      every 1 second or 1000 milliseconds */
      timer = setInterval(() => {
        /* New variable "now" assigned to Date.now() 
      It returns the number of milliseconds since January 1, 1970. */
        let now = Date.now();

        /* New variable elapsedTime assigned to the output of now - lastTime which are currently both equal to each other.
      So the output currently would be 0.*/
        let elapsedTime = now - lastTime;

        /* timeLeft which is currently set to 3000 seconds/50 minutes or 600 seconds or 10 minutes.
      elapsedTime / 1000, rounded down is currently 0, because now - lastTime is the same
      So the output of timeLeft would be the same, 3000 seconds or 600 seconds*/
        timeLeft -= Math.floor(elapsedTime / 1000);

        /* now = milliseconds since jan 1st 1970 subtracted by elaspedTime which is 0
      divided by 1000 with a remainder of 0
      lastTime would equal the milliseconds since 1970 */
        lastTime = now - (elapsedTime % 1000);

        /* Calling the updateTimer function which will display the same timeLeft which is 
        3000 seconds / 50 minutes or 600 seconds / 10 minutes, but now it will update 
        every second or 1000 milliseconds because it is called within a setInterval method 
        calling it every 1000 milliseconds */
        updateTimer();

        /* If the timeLeft hits 0 seconds left, the interval will stop running, the isRunning variable
      will be set to false, timeLeft will now be set to 0, and the sessions will increase by 1 and display
      Then, the breakTime function will be called*/
        if (timeLeft <= 0) {
          clearInterval();
          isRunning = false;
          timeLeft = 0;
          sessions++;
          sessionElement.textContent = sessions;
          breakTime();
        }
      }, 1000);
    }
  }

  // Stop/Pause Timer

  function stop() {
    clearInterval(timer);
    isRunning = false;
  }

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
      inBreak = false;
      reset();
      start();
    } else {
      sessions++;
      sessionElement.textContent = sessions;
      breakTime();
    }
  }

  // Start break timer

  function breakTime() {
    /* When the breakTime function is called, timeLeft will now be set to 600 seconds or 10 minutes
    The inBreak variable will now be true. The updateTimer function will now be called displaying
    the current time left, then the start function and playAudio dunction will be called. */
    timeLeft = 30;
    inBreak = true;
    updateTimer();
    start();
    playAudio();
  }

  // End break timer

  // End of session / break audio

  function playAudio() {
    breakAudio.volume = 0.05;
    breakAudio.play();
  }
});
