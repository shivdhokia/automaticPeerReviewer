module.exports = (app) => {
    const cohorts = require('../controllers/cohort.controller.js');

    // Create a new Cohort
    app.post('/cohorts', cohorts.create);

    // Retrieve all Cohorts
    app.get('/cohorts', cohorts.findAll);

    app.get('/cohorts/active', cohorts.findActive);

    app.get('/cohorts/expired', cohorts.findExpired);

    // Retrieve a single Cohort with productId
    app.get('/cohorts/:cohortId', cohorts.findOne);

    // Update a Note with cohortId
    app.put('/cohorts/:cohortId', cohorts.update);

    // Delete a Note with productId
    app.delete('/cohorts/:cohortId', cohorts.delete);
}