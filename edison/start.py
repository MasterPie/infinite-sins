#!/usr/bin/env python

import mraa
import time
import os
import thread

is_active = False

#PINS
progress_pin = mraa.Gpio(8)
progress_pin.dir(mraa.DIR_OUT)

closebtn_pin = mraa.Gpio(2)
closebtn_pin.dir(mraa.DIR_IN)

def blink_progress():
	is_active = True
	while is_active:
		progress_pin.write(1)
		time.sleep(0.05)
		progress_pin.write(0)
		time.sleep(0.05)
	progress_pin.write(1)
	
def do_faces():
	os.system("python extract_faces.py haarcascade_frontalface_default.xml")

already_pressed = False

while True:
	progress_pin.write(1)
	if closebtn_pin.read() and already_pressed == False:
		already_pressed = True
		thread.start_new_thread(blink_progress, ())
		do_faces()
		is_active = False
		progress_pin.write(1)
	if closebtn_pin.read() == 0:
		already_pressed = False
