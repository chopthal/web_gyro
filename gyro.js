const gyroX = document.querySelector(".gyro-x");
const gyroY = document.querySelector(".gyro-y");
const gyroZ = document.querySelector(".gyro-z");
const sensorText = document.querySelector(".sensor");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
let isStop = false;
let x = 0;
startBtn.addEventListener("click", onClickStart);
stopBtn.addEventListener("click", () => {
  isStop = true;
});

window.addEventListener("devicemotion", handleMotion, true);

function handleMotion(event) {
  console.log(event.acceleration.x);
  sensorText.innerHTML = "Reading...";

  x = event.acceleration.x;

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
      "graph",
      {
        y: [[x]],
      },
      [0]
    );

    if (isStop === true) clearInterval(interval);
  }, 300);
}

function rand() {
  return Math.random();
}

Plotly.plot("graph", [
  {
    y: [],
    mode: "lines",
    line: { color: "#80CAF6" },
  },
]);
