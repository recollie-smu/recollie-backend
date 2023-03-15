/* Create the function for updating the date_updated column when update is detected*/
CREATE FUNCTION sync_lastmod() RETURNS trigger AS $$
BEGIN
  NEW.date_updated := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

/* Create the trigger for sync_lastmod function*/
CREATE TRIGGER
  sync_lastmod
BEFORE UPDATE ON
  reminders
FOR EACH ROW EXECUTE PROCEDURE
  sync_lastmod();