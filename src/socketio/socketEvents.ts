import { ReminderUpdate, Reminder } from "../models/reminder";
import {v4 as uuidv4} from 'uuid';

/**
 * Handles WS disconnection.
 * 
 * @param namespace - The socket.io namespace to broadcast to.
 */
function handleDisconnect(namespace) {
    console.log(`${namespace} client disconnected`);
}

/**
 * Broadcasts a sensor input to WebUI from Serial looper.
 * 
 * @param socket - The socket.io namespace to broadcast to. 
 * @param msg - The sensor input.
 */
function sensorBroadcast(socket, msg) {
    //Broadcast to all clients except the sender
    socket.emit('sensor', msg);
}

/**
 * Broadcasts a task status between WebUI and Serial looper.
 * 
 * @param socket - The socket.io namespace to broadcast to. 
 * @param msg - The task status.
 */
function taskBroadcast(socket, msg) {
    //Broadcast to all clients except the sender
    socket.emit('task', msg);
}

/**
 * Broadcasts a Supabase reminder update to WebUI.
 * 
 * @remarks
 * Requires client to acknowledge the event within 10 seconds.
 * 
 * @param socket - The socket.io namespace to broadcast to. (WebUINamespace Only)
 * @param payload - The Supabase database change payload.
 */
async function reminderUpdateBroadcast(socket, payload) {
    try {
        // map data to Reminder
        let data = payload.new;
        if (data) {
            data.date_created = new Date(data.date_created);
            data.date_updated = new Date(data.date_updated);
        }

        let eventPayload = extractEventPayload(payload.eventType, data, payload.old);
        console.debug("Reminder update received: ");
        console.debug(eventPayload)
        
        //Broadcast to all clients except the sender
        if (eventPayload) {
            socket.timeout(10000).emit("reminder", eventPayload, (err, responses) => {
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

/**
 * Returns a ReminderUpdate.
 * 
 * @remarks
 * Extracts the event payload from the Supabase payload for webui.
 * 
 * @param eventType - The type of the event. INSERT, UPDATE or DELETE.
 * @param data - The new data. Same as Reminder.
 * @param old - The old data.
 * @returns The ReminderUpdate.
 */
function extractEventPayload (eventType, data: Reminder, old: any) : ReminderUpdate | null {
    
    // Return only if it is today or day of the week and not deleted
    const d = new Date();
    const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    if (eventType !== 'DELETE' && (data.date !== d.toISOString().split('T')[0] && !data[weekday[d.getDay()]])) {
        console.debug("Reminder is not today or day of the week")
        return null;
    }

    switch (eventType) {
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

function getStatusPayload(chatId: number) : ReminderUpdate {
    return {
        updateId: uuidv4(),
        reminderId: chatId,
        type: 4,
        reminder: null
    }
}

export { handleDisconnect, sensorBroadcast, taskBroadcast, reminderUpdateBroadcast, getStatusPayload};