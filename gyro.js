const gyroX = document.querySelector(".gyro-x");
const gyroY = document.querySelector(".gyro-y");
const gyroZ = document.querySelector(".gyro-z");
const sensorText = document.querySelector(".sensor");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
let isStop = false;
let x = 0;
let y = 0;
let z = 0;

startBtn.addEventListener("click", onClickStart);
stopBtn.addEventListener("click", () => {
  isStop = true;
});

window.addEventListener("devicemotion", handleMotion, true);

function handleMotion(event) {
  console.log(event.acceleration.x);
  sensorText.innerHTML = "Reading...";

  x = event.acceleration.x;
  y = event.acceleration.y;
  z = event.acceleration.z;

  gyroX.innerHTML = event.acceleration.x;
  gyroY.innerHTML = event.acceleration.y;
  gyroZ.innerHTML = event.acceleration.z;
}

function onClickStart() {
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
  const interval = setInterval(function () {
    Plotly.extendTraces(
      "graph-x",
      {
        y: [[x], [y], [z]],
      },
      [0, 1, 2]
    );

    if (isStop === true) clearInterval(interval);
  }, 300);
}

Plotly.plot("graph-x", [
  {
    y: [0, 0, 0],
    mode: "lines",
    line: { color: "#80CAF6" },
    name: "X",
  },
  {
    y: [1, 2, 3],
    mode: "lines",
    line: { color: "#FF5733" },
    name: "Y",
  },
  {
    y: [4, 5, 6],
    mode: "lines",
    line: { color: "#36F708" },
    name: "Z",
  },
]);

// Plotly.plot("graph-y", [
//   {
//     y: [],
//     mode: "lines",
//     line: { color: "#80CAF6" },
//   },
// ]);

// Plotly.plot("graph-z", [
//   {
//     y: [],
//     mode: "lines",
//     line: { color: "#80CAF6" },
//   },
// ]);
