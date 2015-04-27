from pixy import *
from ctypes import *

#print ("Finding pen")

# Initialize Pixy Interpreter thread #
pixy_init()

class Blocks (Structure):
  _fields_ = [ ("type", c_uint),
               ("signature", c_uint),
               ("x", c_uint),
               ("y", c_uint),
               ("width", c_uint),
               ("height", c_uint),
               ("angle", c_uint) ]

blocks = Block()

testTime = 0 

# Wait for blocks #

while 1: 

	count = pixy_get_blocks(1, blocks)

	if count > 0:
    # Blocks found #
		print '[BLOCK_TYPE=%d SIG=%d X=%3d Y=%3d WIDTH=%3d HEIGHT=%3d]' % (blocks.type, blocks.signature, blocks.x, blocks.y, blocks.width, blocks.height)
		print ("FOUND")
		testTime = 500

	testTime = testTime + 1
