const timeDisplay = document.getElementById("timeDisplay");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const resumeBtn = document.getElementById("resumeBtn");

let startTime = 0;
let elapsed_Time = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let pausedTime = 0;
let hrs = 0;
let mins = 0;
let secs = 0;
let millisecs = 0;

startBtn.addEventListener("click", () => {
  if (paused && startTime === 0) {
    paused = false;
    startTime = Date.now();
    intervalId = setInterval(updateTime, 10);
  }
});

resumeBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    startTime = Date.now() - elapsed_Time;
    intervalId = setInterval(updateTime, 10);
  }
});

pauseBtn.addEventListener("click", () => {
  if (!paused) {
    paused = true;
    pausedTime = Date.now();
    clearInterval(intervalId);
  }
});

resetBtn.addEventListener("click", () => {
  paused = true;
  clearInterval(intervalId);
  startTime = 0;
  elapsed_Time = 0;
  currentTime = 0;
  hrs = 0;
  mins = 0;
  secs = 0;
  millisecs = 0;
  timeDisplay.textContent = `00:00:00.000`;
});

function updateTime() {
  if (!paused) {
    elapsed_Time = Date.now() - startTime;
    console.log(elapsed_Time);

    millisecs = elapsed_Time % 1000;
    secs = Math.floor((elapsed_Time / 1000) % 60);
    mins = Math.floor((elapsed_Time / (1000 * 60)) % 60);
    hrs = Math.floor((elapsed_Time / (1000 * 60 * 60)) % 60);

    secs = formatZeros(secs);
    mins = formatZeros(mins);
    hrs = formatZeros(hrs);
    millisecs = formatZerosMILSECONDS(millisecs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}.${millisecs}`;
  }

  function formatZerosMILSECONDS(time) {
    time = time.toString();
    if (time.length === 1) {
      return "0" + time;
    } else if (time.length === 2) {
      return "0" + time;
    } else {
      return time;
    }
  }

  function formatZeros(time) {
    time = time.toString();
    return time.length < 2 ? "0" + time : time;
  }
}
