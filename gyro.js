let sensor = new Gyroscope();
sensor.start();

const gyroX = document.querySelector(".gyro-x");
const gyroY = document.querySelector(".gyro-y");
const gyroZ = document.querySelector(".gyro-z");
const sensorText = document.querySelector(".sensor");

sensor.onreading = () => {
  console.log("Angular velocity around the X-axis " + sensor.x);
  console.log("Angular velocity around the Y-axis " + sensor.y);
  console.log("Angular velocity around the Z-axis " + sensor.z);

  console.log("Reading...");
  sensorText.innerHTML = "Reading...";

  gyroX.innerHTML = sensor.x;
  gyroY.innerHTML = sensor.y;
  gyroZ.innerHTML = sensor.z;
};

sensor.onerror = (event) => {
  console.log(event.error.name, event.error.message);
  sensorText.innerHTML = event.error.message;
};

// // DeviceMotion 이벤트
// window.addEventListener("devicemotion", devicemotionHandler);
// const gyroX = document.querySelector(".gyro-x");
// const gyroY = document.querySelector(".gyro-y");
// const gyroZ = document.querySelector(".gyro-z");

// // 가속도 변화
// function devicemotionHandler(event) {
//   // 가속도
//   // X축
//   const x = event.acceleration.x;
//   // Y축
//   const y = event.acceleration.y;
//   // Z축
//   const z = event.acceleration.z;
//   console.log(`Angular velocity along the X-axis ${x}`);
//   console.log(`Angular velocity along the Y-axis ${y}`);
//   console.log(`Angular velocity along the Z-axis ${z}`);

//   gyroX.innerHTML = x;
//   gyroY.innerHTML = y;
//   gyroZ.innerHTML = z;
// }

// // let gyroscope = new Gyroscope({ frequency: 60 });
// // const gyroX = document.querySelector(".gyro-x");
// // const gyroY = document.querySelector(".gyro-y");
// // const gyroZ = document.querySelector(".gyro-z");

// // gyroX.innerHTML = "X";
// // gyroY.innerHTML = "Y";
// // gyroZ.innerHTML = "Z";

// // gyroscope.addEventListener("reading", (e) => {
// //   console.log(`Angular velocity along the X-axis ${gyroscope.x}`);
// //   console.log(`Angular velocity along the Y-axis ${gyroscope.y}`);
// //   console.log(`Angular velocity along the Z-axis ${gyroscope.z}`);

// //   gyroX.innerHTML = gyroscope.x;
// //   gyroY.innerHTML = gyroscope.y;
// //   gyroZ.innerHTML = gyroscope.z;
// // });
// // gyroscope.start();
