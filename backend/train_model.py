import cv2
import numpy as np
import os
from PIL import Image 


recognizer = cv2.face.LBPHFaceRecognizer_create(1, 8, 8, 8)
detector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
def getImagesAndLabels(path):
    imagePaths = [os.path.join(path, f) for f in os.listdir(path)]     
    faceSamples = []
    ids = []

    for imagePath in imagePaths:
        PIL_img = Image.open(imagePath).convert('L') 
        img_numpy = np.array(PIL_img, 'uint8')
        img_numpy = cv2.equalizeHist(img_numpy)

        id = int(os.path.split(imagePath)[-1].split(".")[1])
        faces = detector.detectMultiScale(img_numpy)

        for (x, y, w, h) in faces:
            faceSamples.append(img_numpy[y:y+h, x:x+w])
            ids.append(id)

    return faceSamples, ids

print("\n [INFO] Training started")
faces, ids = getImagesAndLabels('face_data')
recognizer.train(faces, np.array(ids))

if not os.path.exists('model'):
    os.makedirs('model')
recognizer.write('model/trainer.yml') 
print(f"\n [INFO] {len(np.unique(ids))} face trained.")