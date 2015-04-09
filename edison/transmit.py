import sys
import base64

image_path = sys.argv[1]

from urllib2 import Request, urlopen, URLError
from urllib import urlencode

host = "http://vivek-notebook:3000"

try:
	with open(image_path, "rb") as image_file:
		image_data = image_file.read();
		encoded_string = image_data.encode("base64")

	data = encoded_string;

	request = Request(host + "/upload",data,headers={'Content-type': 'text/plain'})

	response = urlopen(request)
	print response.geturl()
#	print response.info()
	kittens = response.read()
	print kittens

except URLError, e:
	print "Nope...Error code:" , e
