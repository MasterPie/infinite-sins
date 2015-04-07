import cv2.cv as cv
import sys
import base64
import cv2

cascPath = sys.argv[1]
faceCascade = cv2.CascadeClassifier(cascPath);

from urllib2 import Request, urlopen, URLError
from urllib import urlencode

PADDING = 20

#capture = cv.CaptureFromCAM(0)
video_capture = cv2.VideoCapture(0)
#img = cv.QueryFrame(capture)
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
	cv2.rectangle(img, (x-PADDING, y-PADDING), (x+w+PADDING, y+h+PADDING), (0, 255, 0), 2)
	crop_img = img[y-PADDING:y+h+PADDING,x-PADDING:x+w+PADDING]
	face_imgs.append(crop_img)

#cv.SaveImage("camera.jpg", img)
cv2.imwrite('camera.jpg', face_imgs[0])

host = "http://vivek-notebook:3000"

try:
	with open("camera.jpg", "rb") as image_file:
		image_data = image_file.read();
		encoded_string = image_data.encode("base64")

	values = encoded_string;
	data = values;
	#data = urlencode(values);

	request = Request(host + "/upload",data,headers={'Content-type': 'text/plain'})

	response = urlopen(request)
	print response.geturl()
	print response.info()
	kittens = response.read()
	print kittens

except URLError, e:
	print "Nope...Error code:" , e
