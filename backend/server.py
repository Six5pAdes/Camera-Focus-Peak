from flask import Flask, request, jsonify, Response
import cv2
import numpy as np

app = Flask(__name__)

@app.route('/process-video', methods=['POST'])
def process_video():
    video_file = request.files['video']
    if not video_file:
        return jsonify({"error": "No video file provided"}), 400

    # Save the uploaded video temporarily
    video_path = "uploaded_video.mp4"
    video_file.save(video_path)

    # Open the video file
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return jsonify({"error": "Could not open video file"}), 500

    def generate_frames():
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Convert to grayscale and apply Laplacian for focus peaking
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            laplacian = cv2.Laplacian(gray, cv2.CV_64F)
            laplacian = np.absolute(laplacian)
            laplacian = np.uint8(laplacian)

            # Create a colored overlay for focus peaking
            overlay = cv2.applyColorMap(laplacian, cv2.COLORMAP_JET)
            combined = cv2.addWeighted(frame, 0.7, overlay, 0.3, 0)

            # Encode the frame as JPEG
            _, buffer = cv2.imencode('.jpg', combined)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

        cap.release()

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
