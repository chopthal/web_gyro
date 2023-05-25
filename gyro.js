const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const clearBtn = document.querySelector(".clear-btn");
const analyzeBtn = document.querySelector(".analyze-btn");
const timeInput = document.querySelector(".time-input");
const avgResult = document.querySelector(".average");
const maxResult = document.querySelector(".max");
const xAvg = document.querySelector(".x-avg");
const yAvg = document.querySelector(".y-avg");
const zAvg = document.querySelector(".z-avg");
const xRmse = document.querySelector(".x-rmse");
const yRmse = document.querySelector(".y-rmse");
const zRmse = document.querySelector(".z-rmse");
const xMax = document.querySelector(".x-max");
const yMax = document.querySelector(".y-max");
const zMax = document.querySelector(".z-max");

const digit = 6; // 10^n
const measureInterval = 100; // [ms]

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
  }, measureInterval);
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
  xAvg.innerHTML = Math.round(average(logX)).toLocaleString();
  yAvg.innerHTML = Math.round(average(logY)).toLocaleString();
  zAvg.innerHTML = Math.round(average(logZ)).toLocaleString();
  xRmse.innerHTML = rmse(logX).toLocaleString();
  yRmse.innerHTML = rmse(logY).toLocaleString();
  zRmse.innerHTML = rmse(logZ).toLocaleString();
  xMax.innerHTML = maxPeak(logX).toLocaleString();
  yMax.innerHTML = maxPeak(logY).toLocaleString();
  zMax.innerHTML = maxPeak(logZ).toLocaleString();
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
  const result = arr.reduce((p, c) => p + Math.abs(c), 0) / arr.length;
  return result;
}

function rmse(arr) {
  const result = Math.sqrt(arr.reduce((p, c) => p + c ** 2, 0) / arr.length);
  return result;
}

function maxPeak(arr) {
  return Math.max(...arr.map(Math.abs));
}
