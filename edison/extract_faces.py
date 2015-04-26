import cv2.cv as cv
import sys
import base64
import cv2
import os
import numpy as np

cascPath = sys.argv[1]
faceCascade = cv2.CascadeClassifier(cascPath);

SNAPSHOT_DIR = "snapshots/"

from urllib2 import Request, urlopen, URLError
from urllib import urlencode

PADDING = 20

video_capture = cv2.VideoCapture(0)
video_capture.set(cv.CV_CAP_PROP_CONTRAST,0.1)
video_capture.set(cv.CV_CAP_PROP_BRIGHTNESS, 0.08)
video_capture.set(cv.CV_CAP_PROP_SATURATION, 0.02)
ret, img = video_capture.read()
video_capture.release()
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags=cv.CV_HAAR_SCALE_IMAGE
    )

face_imgs = []

# Draw a rectangle around the faces
for (x, y, w, h) in faces:
	crop_img = img[y-PADDING:y+h+PADDING,x-PADDING:x+w+PADDING]
	face_imgs.append(crop_img)

snapshot_id = 1

for face_img in face_imgs:
	cv2.imwrite(SNAPSHOT_DIR + `snapshot_id` + '.jpg', face_img)
	snapshot_id = snapshot_id + 1

snapshot_id = 1

for face_img in face_imgs:
	os.system("python transmit.py " + SNAPSHOT_DIR + `snapshot_id` + '.jpg')
	snapshot_id = snapshot_id + 1

