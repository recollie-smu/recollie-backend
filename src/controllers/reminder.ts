import {Reminder} from '../models/reminder';

async function get(req, res, next, supabase) {
  try {
    const d = new Date();
    // Day of week is 0-6, Sunday is 0
    const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]; 
    console.log("Querying for " + d.toISOString().split('T')[0] + " " + weekday[d.getDay()])
    
    const { data, sb_err } = await supabase
      .from('reminders')
      .select('*')
      .or(`date.eq.${d.toISOString().split('T')[0]},${weekday[d.getDay()]}.eq.true`) // Filter by date non-repeating reminders or day of week for repeating reminders
      .order('time', { ascending: true })

    if (sb_err) {
      console.error(`Error while getting`, sb_err.message);
      //return status 500
      res.status(500).json(null)
    }

    if (!data) {
      console.log("No reminders found for today")
      //return status 404
      res.status(404).json(null)
    } else {
      const reminders: Reminder[] = data.map((reminder: any) => {
        const {
          id,
          name,
          status,
          description,
          location,
          duration,
          time,
          date,
          image,
          memo,
          date_created,
          date_updated,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
        } = reminder;
    
        return {
          id,
          name,
          status,
          description,
          location,
          duration,
          time,
          date,
          image,
          memo,
          date_created: new Date(date_created),
          date_updated: new Date(date_updated),
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
        };
      });
  
      res.json(reminders);
    }

    
  } catch (err) {
    console.error(`Error while getting`, err.message);
    //return status 500
    res.status(500).json(null)
  }
}

module.exports = {
  get,
};