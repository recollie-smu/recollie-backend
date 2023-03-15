

async function get(req, res, next, supabase) {
  try {
    const { data, sb_err } = await supabase
      .from('reminders')
      .select('*')
    
    if (sb_err) {
      console.error(`Error while getting`, sb_err.message);
      next(sb_err);
    }

    res.json({'message': data});
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
}

module.exports = {
  get,
};