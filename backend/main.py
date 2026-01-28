import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import os

app = Flask(__name__)
CORS(app)

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
recognizer = cv2.face.LBPHFaceRecognizer_create()
base_dir = os.path.dirname(os.path.abspath(__file__))
trainer_path = os.path.join(base_dir, 'model', 'trainer.yml')
if os.path.exists(trainer_path):
    recognizer.read(trainer_path)
    print(f"SUCCESS: Model loaded from {trainer_path}")
else:
    print(f"STILL NOT FOUND: Python is looking at: {trainer_path}")

@app.route('/verify-face', methods=['POST'])
def verify_face():
    try:
        data = request.json
        image_data = data['image']
        encoded_data = image_data.split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.2, 5)

        if len(faces) == 0:
            return jsonify({"status": "fail", "message": "No face detected"})

        for (x, y, w, h) in faces:
            id_predicted, confidence = recognizer.predict(gray[y:y+h, x:x+w])
            print(f"Detected ID: {id_predicted} with confidence: {confidence}")
            if confidence < 90:
                return jsonify({
                    "status": "success", 
                    "message": f"Welcome User {id_predicted}",
                    "confidence": round(100 - confidence, 2)
                })
            else:
                return jsonify({"status": "fail", "message": "Face doesn't match"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)