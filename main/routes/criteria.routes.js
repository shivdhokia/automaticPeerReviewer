module.exports = (app) => {
    const criteria = require('../controllers/criteria.controller.js');

    // Create a new Criteria
    app.post('/criteria', criteria.create);

    // Retrieve all Criteria
    app.get('/criteria', criteria.findAll);

    // Retrieve a single Criteria with productId
    app.get('/criteria/:cohortId', criteria.findOne);

    // Update a Note with criteriaId
    app.put('/criteria/:cohortId', criteria.update);

    // Delete a Note with criteriaId
    app.delete('/cohcriteriaorts/:cohortId', criteria.delete);
}