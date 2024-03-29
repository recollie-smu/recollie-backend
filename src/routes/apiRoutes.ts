const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminder.ts');

/**
 * Creates the API routes.
 * 
 * @param supabase - The Supabase client instance.
 * @returns The router instance.
 */
module.exports = (supabase) => {
    router.get('/reminders', function(req, res, next) {
        reminderController.get(req, res, next, supabase);
      });
    return router;
};