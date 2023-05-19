let gyroscope = new Gyroscope({ frequency: 60 });
const gyroX = document.querySelector(".gyro-x");
const gyroY = document.querySelector(".gyro-y");
const gyroZ = document.querySelector(".gyro-z");

gyroX.innerHTML = "X";
gyroY.innerHTML = "Y";
gyroZ.innerHTML = "Z";

gyroscope.addEventListener("reading", (e) => {
  console.log(`Angular velocity along the X-axis ${gyroscope.x}`);
  console.log(`Angular velocity along the Y-axis ${gyroscope.y}`);
  console.log(`Angular velocity along the Z-axis ${gyroscope.z}`);

  gyroX.innerHTML = gyroscope.x;
  gyroY.innerHTML = gyroscope.y;
  gyroZ.innerHTML = gyroscope.z;
});
gyroscope.start();
