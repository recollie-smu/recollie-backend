from flask import request
def handle_pet_status():
    if request.method == 'GET':
        print('Received pet status request')
        return 'OK'
        # Handle pet status request and return response
    elif request.method == 'PUT':
        data = request.json
        print(f'Received pet status update: {data}')
        # Handle pet status update and return response if needed