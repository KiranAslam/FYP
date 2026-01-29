import cv2
import os
import time

if not os.path.exists('face_data'):
    os.makedirs('face_data')

cam = cv2.VideoCapture(0)
cam.set(3, 640) 
cam.set(4, 480) 

face_detector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

face_id = 1 
count = 0
total_pics = 300 

print(f"\n [INFO] Camera Opening!")
while True:
    ret, img = cam.read()
    if not ret:
        break

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)
    faces = face_detector.detectMultiScale(
        gray, 
        scaleFactor=1.2, 
        minNeighbors=5, 
        minSize=(100, 100) 
    )

    for (x, y, w, h) in faces:
        count += 1
        file_path = f"face_data/User.{face_id}.{count}.jpg"
        cv2.imwrite(file_path, gray[y:y+h, x:x+w])
        cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cv2.putText(img, f"Captured: {count}/{total_pics}", (50, 50), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        
        cv2.imshow('Capturing Face...', img)
        time.sleep(0.1) 

    if cv2.waitKey(1) & 0xFF == 27 or count >= total_pics:
        break

print(f"\n [INFO] Success! {count} optimized photos saved in 'face_data/'.")
cam.release()
cv2.destroyAllWindows()