import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app) 
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

@app.route('/verify-face', methods=['POST'])
def verify_face():
    data = request.json
    image_data = data['image'] 
    encoded_data = image_data.split(',')[1]
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.臨界_COLOR)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    if len(faces) > 0:
        return jsonify({"status": "success", "message": "Face Detected!"})
    else:
        return jsonify({"status": "fail", "message": "No face found"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)