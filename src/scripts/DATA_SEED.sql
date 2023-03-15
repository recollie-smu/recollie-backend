INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Tdy', 0, 'Desc', 0, 0, TO_TIMESTAMP('08:00:00', 'HH24:MI:SS')::TIME, TO_DATE('20230315','YYYYMMDD'), null, null, false, false, false, false, false, false, false);

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Weds1', 0, 'Desc', 0, 0, TO_TIMESTAMP('15:00:00', 'HH24:MI:SS')::TIME, null, null, null, false, false, true, false, false, false, false);

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Weds2', 0, 'Desc', 0, 0, TO_TIMESTAMP('01:00:00', 'HH24:MI:SS')::TIME, null, null, null, false, false, true, false, false, false, false);

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('Thurs', 0, 'Desc', 0, 0, TO_TIMESTAMP('01:00:00', 'HH24:MI:SS')::TIME, null, null, null, false, false, false, true, false, false, false);

INSERT INTO reminders (name, status, description, location, duration, time, date, image, memo, monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES ('NotTdy', 0, 'Desc', 0, 0, TO_TIMESTAMP('08:00:00', 'HH24:MI:SS')::TIME, TO_DATE('20230317','YYYYMMDD'), null, null, false, false, false, false, false, false, false);