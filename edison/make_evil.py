import sys
import base64

image_path = sys.argv[1]

from urllib2 import Request, urlopen, URLError
from urllib import urlencode

#host = "http://vivek-notebook:3000"
host = "http://pacific-journey-1425.azurewebsites.net"

try:
	request = Request(host + "/mark")

	response = urlopen(request)
	print response.geturl()
#	print response.info()
	kittens = response.read()
	print kittens

except URLError, e:
	print "Nope...Error code:" , e
