const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const clearBtn = document.querySelector(".clear-btn");
const analyzeBtn = document.querySelector(".analyze-btn");
const timeInput = document.querySelector(".time-input");
const avgResult = document.querySelector(".average");
const maxResult = document.querySelector(".max");

const digit = 6;

initilizePlot();

let x = 0;
let y = 0;
let z = 0;
let logX = [];
let logY = [];
let logZ = [];

let interval = [];

startBtn.addEventListener("click", onClickStart);
stopBtn.addEventListener("click", onClickStop);
clearBtn.addEventListener("click", onClickClear);
analyzeBtn.addEventListener("click", onClickAnalyze);

function onClickStart() {
  window.addEventListener("devicemotion", handleMotion, true);
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    // Handle iOS 13+ devices.
    DeviceMotionEvent.requestPermission()
      .then((state) => {
        if (state === "granted") {
          window.addEventListener("devicemotion", handleMotion);
        } else {
          console.error("Request to access the orientation was rejected");
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non iOS 13+ devices.
    window.addEventListener("devicemotion", handleMotion);
  }
  onClickStop();
  interval = setInterval(function () {
    Plotly.extendTraces(
      "graph",
      {
        y: [[x], [y], [z]],
      },
      [0, 1, 2]
    );
    logX = [...logX, x];
    logY = [...logY, y];
    logZ = [...logZ, z];
  }, 300);
  if (!timeInput.value) {
    return;
  }
  setTimeout(() => {
    clearInterval(interval);
  }, parseFloat(timeInput.value) * 1000);
}

function onClickStop() {
  clearInterval(interval);
}

function onClickClear() {
  x = 0;
  y = 0;
  z = 0;
  logX = [];
  logY = [];
  logZ = [];

  onClickStop();
  initilizePlot();
}

function onClickAnalyze() {
  avgResult.innerHTML = `[Average] X : ${Math.round(
    average(logX)
  ).toLocaleString()}, Y : ${Math.round(
    average(logY)
  ).toLocaleString()}, Z : ${Math.round(average(logZ)).toLocaleString()}`;

  maxResult.innerHTML = `[Max peak(abs)] X : ${maxPeak(
    logX
  ).toLocaleString()}, Y : ${maxPeak(logY).toLocaleString()}, Z : ${maxPeak(
    logZ.toLocaleString()
  )}`;
}

function initilizePlot() {
  Plotly.newPlot("graph", [
    {
      y: [],
      mode: "lines",
      line: { color: "#80CAF6" },
      name: "X",
    },
    {
      y: [],
      mode: "lines",
      line: { color: "#FF5733" },
      name: "Y",
    },
    {
      y: [],
      mode: "lines",
      line: { color: "#36F708" },
      name: "Z",
    },
  ]);
}

function handleMotion(event) {
  x = Math.round(event.acceleration.x * 10 ** digit);
  y = Math.round(event.acceleration.y * 10 ** digit);
  z = Math.round(event.acceleration.z * 10 ** digit);
}

function average(arr) {
  const result = arr.reduce((p, c) => p + c, 0) / arr.length;
  return result;
}

function maxPeak(arr) {
  return Math.max(...arr.map(Math.abs));
}
