import sys
from urllib2 import Request, urlopen, URLError
from urllib import urlencode

#host = "http://vivek-notebook:3000"
host = "http://pacific-journey-1425.herokuapp.com"

try:

	request = Request(host + "/clear")

	response = urlopen(request)
	print response.geturl()
	print response.info()
	kittens = response.read()
	print kittens

except URLError, e:
	print "Nope...Error code:" , e
