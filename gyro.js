const gyroX = document.querySelector(".gyro-x");
const gyroY = document.querySelector(".gyro-y");
const gyroZ = document.querySelector(".gyro-z");
const sensorText = document.querySelector(".sensor");
const permissionBtn = document.querySelector(".permission-btn");

permissionBtn.addEventListener("onclick", () => onClick);

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

// let sensor = new Gyroscope();
// sensor.start();

// const gyroX = document.querySelector(".gyro-x");
// const gyroY = document.querySelector(".gyro-y");
// const gyroZ = document.querySelector(".gyro-z");
// const sensorText = document.querySelector(".sensor");

// sensor.onreading = () => {
//   console.log("Angular velocity around the X-axis " + sensor.x);
//   console.log("Angular velocity around the Y-axis " + sensor.y);
//   console.log("Angular velocity around the Z-axis " + sensor.z);

//   console.log("Reading...");
//   sensorText.innerHTML = "Reading...";

//   gyroX.innerHTML = sensor.x;
//   gyroY.innerHTML = sensor.y;
//   gyroZ.innerHTML = sensor.z;
// };

// sensor.onerror = (event) => {
//   console.log(event.error.name, event.error.message);
//   sensorText.innerHTML = event.error.message;
// };
