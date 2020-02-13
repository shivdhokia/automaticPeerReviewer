const Criteria = require('../models/cohort.model.js');

//Create new Criteria
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Criteria content can not be empty"
        });
    }

    // Create a Criteria
    const criteria = new Criteria({
        title: req.body.title || "No criteria title", 
        criteriaData: req.body.criteriaData
    });

    // Save Product in the database
    criteria.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the criteria."
        });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Criteria.find()
    .then(allCriteria => {
        res.send(allCriteria);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving criteria."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Criteria.findById(req.params.criteriaId)
    .then(criteria => {
        if(!criteria) {
            return res.status(404).send({
                message: "Criteria not found with id " + req.params.criteriaId
            });            
        }
        res.send(criteria);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Criteria not found with id " + req.params.criteriaId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving criteria with id " + req.params.criteriaId
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Criteria content can not be empty"
        });
    }

    // Find and update product with the request body
    Criteria.findByIdAndUpdate(req.params.criteriaId, {
        title: req.body.title || "No criteria title", 
        criteriaData: req.body.criteriaData
    }, {new: true})
    .then(criteria => {
        if(!criteria) {
            return res.status(404).send({
                message: "Criteria not found with id " + req.params.criteriaId
            });
        }
        res.send(criteria);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Criteria not found with id " + req.params.criteriaId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating criteria with id " + req.params.criteriaId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Criteria.findByIdAndRemove(req.params.criteriaId)
    .then(criteria => {
        if(!criteria) {
            return res.status(404).send({
                message: "Criteria not found with id " + req.params.criteriaId
            });
        }
        res.send({message: "Criteria deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Criteria not found with id " + req.params.criteriaId
            });                
        }
        return res.status(500).send({
            message: "Could not delete criteria with id " + req.params.criteriaId
        });
    });
};