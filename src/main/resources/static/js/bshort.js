/**
 * 마비노기에 사용 하려고 만든 웹이 아님 오해 ㄴㄴ
 * 
 * 
 */

const button = document.getElementById('start');
const canvas = document.getElementById('outputCanvas');
const ctx = canvas.getContext('2d');
//스무딩 제거
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;

button.addEventListener('click', async () => {
	try {
		const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
		const video = document.createElement('video');
		video.srcObject = stream;
		video.play();
		
		video.addEventListener('loadedmetadata', () => {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			
			function drawFrame() {
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
				let frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
				let data = frame.data;
				
				for (let i = 0; i < data.length; i += 4) {
					const r = data[i];
					const g = data[i + 1];
					const b = data[i + 2];
					
					const isWhite = (r === 255 && g === 255 && b === 255);
					const isBlack = (r === 0 && g === 0 && b === 0);
					
					if (isWhite) {
						data[i]     = 255; // 빨간색
						data[i + 1] = 0;
						data[i + 2] = 0;
					} else if (isBlack) {
						data[i]     = 255; // 빨간색
						data[i + 1] = 255;
						data[i + 2] = 0;
					} else {
						const avg = (r + g + b) / 3;
						data[i]     = avg;
						data[i + 1] = avg;
						data[i + 2] = avg;
					}
				}
				
				ctx.putImageData(frame, 0, 0);
				requestAnimationFrame(drawFrame);
			}
			
			drawFrame();
		});
	} catch (err) {
		console.error("화면 캡처 실패:", err);
	}
});
