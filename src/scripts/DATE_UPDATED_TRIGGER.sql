CREATE FUNCTION sync_lastmod() RETURNS trigger AS $$
BEGIN
  NEW.date_updated := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER
  sync_lastmod
BEFORE UPDATE ON
  reminders
FOR EACH ROW EXECUTE PROCEDURE
  sync_lastmod();