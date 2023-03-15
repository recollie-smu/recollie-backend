import { ReminderUpdate, Reminder } from "../models/reminder";
import {v4 as uuidv4} from 'uuid';

function handleDisconnect(namespace) {
    console.log(`${namespace} client disconnected`);
}

function sensorBroadcast(socket, msg) {
    //Broadcast to all clients except the sender
    socket.emit('sensor', msg);
}

function taskBroadcast(socket, msg) {
    //Broadcast to all clients except the sender
    socket.emit('task', msg);
}

async function reminderUpdateBroadcast(socket, payload) {
    try {
        // map data to Reminder
        let data = payload.new;
        if (data) {
            data.date_created = new Date(data.date_created);
            data.date_updated = new Date(data.date_updated);
        }

        let event_payload = extract_event_payload(payload.eventType, data, payload.old);
        console.debug("Reminder update received: ");
        console.debug(event_payload)
        
        //Broadcast to all clients except the sender
        if (event_payload) {
            socket.timeout(10000).emit("reminder", event_payload, (err, responses) => {
                if (err) {
                    // some clients did not acknowledge the event in the given delay
                    console.warn("reminder update have timed out");
                }  
                // Handle response
                if (responses && responses.length > 0) {
                    console.log("reminder update have been acknowledged" + responses);
                }
            });
        }
    } catch (err) {
        console.warn("Error in reminderUpdateBroadcast: " + err.message);
    }
}

function extract_event_payload (event, data: Reminder, old: any) : ReminderUpdate | null {
    
    // Return only if it is today or day of the week and not deleted
    const d = new Date();
    const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    if (event !== 'DELETE' && (data.date !== d.toISOString().split('T')[0] && !data[weekday[d.getDay()]])) {
        console.debug("Reminder is not today or day of the week")
        return null;
    }

    switch (event) {
        case 'INSERT':
            return {
                updateId: uuidv4(),
                reminderId: data.id,
                type: 1,
                reminder: data
            }
        case 'UPDATE':
            return {
                updateId: uuidv4(),
                reminderId: data.id,
                type: 2,
                reminder: data
            }
        case 'DELETE':
            return {
                updateId: uuidv4(),
                reminderId: old.id,
                type: 3,
                reminder: null
            }
        default:
            return null;
    }
}

export { handleDisconnect, sensorBroadcast, taskBroadcast, reminderUpdateBroadcast};