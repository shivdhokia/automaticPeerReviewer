module.exports = (app) => {
    const criteria = require('../controllers/criteria.controller.js');

    // Create a new Criteria
    app.post('/criteria', criteria.create);

    // Retrieve all Criteria
    app.get('/criteria', criteria.findAll);

    // Retrieve a single Criteria with productId
    app.get('/criteria/:criteriaId', criteria.findOne);

    // Update a Note with criteriaId
    app.put('/criteria/:criteriaId', criteria.update);

    // Delete a Note with criteriaId
    app.delete('/criteria/:criteriaId', criteria.delete);
}