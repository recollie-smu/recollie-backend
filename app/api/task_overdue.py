from flask import request

def handle_task_overdue():
    data = request.json
    print(f'Received task overdue: {data}')
    # Handle task overdue and return response if needed