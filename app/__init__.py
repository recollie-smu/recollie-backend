from flask import Flask
from flask_socketio import SocketIO
from app.api.web_sockets import *
from app.api.pet_status import *
from app.api.task_overdue import *

app = Flask(__name__)
socketio = SocketIO(app)

# Register all API endpoints
socketio.on_event('connect', handle_connect, namespace='/connect')
socketio.on_event('disconnect', handle_disconnect, namespace='/disconnect')
socketio.on_event('get_reminders', get_reminders, namespace='/reminders')

# Register your other API endpoints here
app.add_url_rule('/taskOverdue', view_func=handle_task_overdue, methods=['POST'])
app.add_url_rule('/petStatus', view_func=handle_pet_status, methods=['GET', 'PUT'])
