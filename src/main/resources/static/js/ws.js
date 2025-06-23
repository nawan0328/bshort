const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false; // 스무딩 제거

const socket = new WebSocket("wss://localhost:8443/ws/canvas");

let video;

document.getElementById("start").addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    video = document.createElement("video");
    video.srcObject = stream;
    video.play();

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      drawLoop();
    };
  } catch (err) {
    console.error("화면 공유 실패", err);
  }
});

function drawLoop() {
  if (!video) return;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataURL = canvas.toDataURL("image/png");
  socket.send(dataURL);

  requestAnimationFrame(drawLoop);
}