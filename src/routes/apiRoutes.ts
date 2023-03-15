const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminder.ts');

/* GET Reminders */
module.exports = (supabase) => {
    router.get('/reminders', function(req, res, next) {
        reminderController.get(req, res, next, supabase);
      });
    return router;
};