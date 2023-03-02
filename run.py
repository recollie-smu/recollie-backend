import os
import sys

# Add the parent directory to the system path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app, socketio

if __name__ == '__main__':
    socketio.run(app)
