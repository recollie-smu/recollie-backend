/* 
    This script is used to seed the database with data for testing purposes.
    Status: 0 = disabled, 1 = enabled
    Location: 0 = living room, 1 = kitchen, 2 = bedroom, 3 = bathroom, 4 = other
    Duartion to complete the task is in minutes
    Day of week set to true for repeating weekly reminders, in this case date is set to null
    Date for a one time reminder, all day of week is set to false
    Image and memo url are set to null for now
*/

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Eat medication', 1, 'The medication are on the kitchen island', 1, 3, TO_TIMESTAMP('08:00:00', 'HH24:MI:SS')::TIME, null, null, null, true, true, true, true, true, true, true);

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Tidy room', 1, 'Check if your room is tidy and change bedsheet', 2, 10, TO_TIMESTAMP('18:00:00', 'HH24:MI:SS')::TIME, TO_DATE('2023-03-15','YYYY-MM-DD'), null, null, false, false, false, false, false, false, false);

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Vaccum the living room', 1, 'Check if your room is tidy and sweep the floor', 0, 30, TO_TIMESTAMP('18:00:00', 'HH24:MI:SS')::TIME, null, null, null, true, true, true, true, true, false, false);

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Do laundry', 1, 'Collect dirty clothes and put them in the washing machine', 2, 60, TO_TIMESTAMP('10:00:00', 'HH24:MI:SS')::TIME, TO_DATE('2023-03-18','YYYY-MM-DD'), null, null, false, false, false, false, false, false, false);

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Drink water', 1, 'Remember to drink water regularly', 1, 5, TO_TIMESTAMP('09:00:00', 'HH24:MI:SS')::TIME, null, null, null, true, true, true, true, true, true, true);

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Exercise', 1, 'Go for a walk around the block', 4, 30, TO_TIMESTAMP('15:00:00', 'HH24:MI:SS')::TIME, null, null, null, false, false, true, false, false, false, false);

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Take a shower', 1, 'Take a shower and use soap', 3, 20, TO_TIMESTAMP('08:30:00', 'HH24:MI:SS')::TIME, null, null, null, true, true, true, true, true, false, false);

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Feed the fish', 1, 'Feed the fish in the living room', 0, 5, TO_TIMESTAMP('17:00:00', 'HH24:MI:SS')::TIME, null, null, null, false, false, true, false, false, false, false);

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Take medication', 1, 'Take medication on the kitchen island', 1, 3, TO_TIMESTAMP('20:00:00', 'HH24:MI:SS')::TIME, null, null, null, false, false, false, false, false, false, true);

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Brush teeth', 1, 'Brush teeth and use mouthwash', 3, 5, TO_TIMESTAMP('07:00:00', 'HH24:MI:SS')::TIME, null, null, null, true, true, true, true, true, false, false);