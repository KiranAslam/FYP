import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import os

app = Flask(__name__)
CORS(app)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
recognizer = cv2.face.LBPHFaceRecognizer_create(1, 8, 8, 8)
base_dir = os.path.dirname(os.path.abspath(__file__))
trainer_path = os.path.join(base_dir, 'model', '../trainer.yml')
if os.path.exists(trainer_path):
    recognizer.read(trainer_path)
@app.route('/verify-face', methods=['POST'])
def verify_face():
    try:
        data = request.json
        image_data = data['image'].split(',')[1]
        nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        gray = clahe.apply(gray)
        faces = face_cascade.detectMultiScale(gray, 1.2, 5)
        if len(faces) == 0:
            return jsonify({"status": "fail", "message": "No face detected"})
        for (x, y, w, h) in faces:
            id_predicted, confidence = recognizer.predict(gray[y:y+h, x:x+w])
            print(f"ID: {id_predicted} | Confidence: {round(confidence, 2)}")
            if confidence < 48: 
                return jsonify({
                    "status": "success", 
                    "message": "Access Granted",
                    "confidence": round(100 - confidence, 2)
                })
            else:
                return jsonify({
                    "status": "fail", 
                    "message": "Unauthorized Access"
                })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
if __name__ == '__main__':
    app.run(port=5000, debug=True)