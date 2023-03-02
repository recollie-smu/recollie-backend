from flask_socketio import SocketIO, emit

def handle_connect():
    # emit('get_reminders');
    print('Client connected')

def handle_disconnect():
    print('Client disconnected')

def get_reminders(data):
    print(f'Received reminder update: {data}')

def handle_interaction(data):
    print(f'Received interaction: {data}')