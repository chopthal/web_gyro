const gyroX = document.querySelector(".gyro-x");
const gyroY = document.querySelector(".gyro-y");
const gyroZ = document.querySelector(".gyro-z");
const sensorText = document.querySelector(".sensor");
const permissionBtn = document.querySelector(".permission-btn");

permissionBtn.addEventListener("click", onClick);

window.addEventListener("deviceorientation", handleOrientation);

function handleOrientation(event) {
  const alpha = event.alpha;
  const beta = event.beta;
  const gamma = event.gamma;

  console.log(alpha);
  console.log(beta);
  console.log(gamma);

  sensorText.innerHTML = "Reading...";

  gyroX.innerHTML = alpha;
  gyroY.innerHTML = beta;
  gyroZ.innerHTML = gamma;
  // Do stuff...
}

function onClick() {
  console.log("clicked!");
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    // Handle iOS 13+ devices.
    DeviceMotionEvent.requestPermission()
      .then((state) => {
        if (state === "granted") {
          window.addEventListener("devicemotion", handleOrientation);
        } else {
          console.error("Request to access the orientation was rejected");
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non iOS 13+ devices.
    window.addEventListener("devicemotion", handleOrientation);
  }
}

function rand() {
  return Math.random();
}

var time = new Date();

var trace1 = {
  x: [],
  y: [],
  mode: "lines",
  line: {
    color: "#80CAF6",
    shape: "spline",
  },
};

var trace2 = {
  x: [],
  y: [],
  xaxis: "x2",
  yaxis: "y2",
  mode: "lines",
  line: { color: "#DF56F1" },
};

var layout = {
  xaxis: {
    type: "date",
    domain: [0, 1],
    showticklabels: false,
  },
  yaxis: { domain: [0.6, 1] },
  xaxis2: {
    type: "date",
    anchor: "y2",
    domain: [0, 1],
  },
  yaxis2: {
    anchor: "x2",
    domain: [0, 0.4],
  },
};

var data = [trace1, trace2];

Plotly.plot("graph", data, layout);

var cnt = 0;

var interval = setInterval(function () {
  var time = new Date();

  var update = {
    x: [[time], [time]],
    y: [[rand()], [rand()]],
  };

  Plotly.extendTraces("graph", update, [0, 1]);

  if (cnt === 100) clearInterval(interval);
}, 1000);
