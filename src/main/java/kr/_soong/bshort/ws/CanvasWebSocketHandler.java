package kr._soong.bshort.ws;

import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.time.Instant;
import java.util.Base64;

import org.springframework.web.socket.handler.TextWebSocketHandler;

public class CanvasWebSocketHandler extends TextWebSocketHandler {


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    	System.out.println("▶ WebSocket 메시지 수신: " + message.getPayload().substring(0, 30));
        // base64 PNG 문자열 수신
        String payload = message.getPayload();
        if (payload.startsWith("data:image/png;base64,")) {
            byte[] imageBytes = Base64.getDecoder().decode(payload.replace("data:image/png;base64,", ""));
            File file = new File("canvas-" + Instant.now().toEpochMilli() + ".png");
            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(imageBytes);
            }
            System.out.println("✅ PNG 저장 완료: " + file.getAbsolutePath());
        }
    }
}
