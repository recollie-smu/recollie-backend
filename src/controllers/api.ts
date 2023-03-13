async function get(req, res, next) {
  try {
    res.json({'message': 'api'});
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
}

module.exports = {
  get,
};