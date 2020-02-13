const Cohort = require('../models/cohort.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Product
    const cohort = new Cohort({
        title: req.body.title || "No cohort title", 
        criteria: req.body.criteria,
        submission: req.body.submission,
        startDate: req.body.startDate,
        expiryDate: req.body.expiryDate
    });

    // Save Product in the database
    cohort.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the product."
        });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Cohort.find()
    .then(cohorts => {
        res.send(cohorts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving cohorts."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Cohort.findById(req.params.cohortId)
    .then(cohort => {
        if(!cohort) {
            return res.status(404).send({
                message: "Cohort not found with id " + req.params.cohortId
            });            
        }
        res.send(cohort);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cohort not found with id " + req.params.cohortId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving cohort with id " + req.params.cohortId
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update product with the request body
    Cohort.findByIdAndUpdate(req.params.cohortId, {
        title: req.body.title || "No cohort title", 
        criteria: req.body.criteria,
        submission: req.body.submission,
        startDate: req.body.startDate,
        expiryDate:req.body.expiryDate
    }, {new: true})
    .then(cohort => {
        if(!cohort) {
            return res.status(404).send({
                message: "Cohort not found with id " + req.params.cohortId
            });
        }
        res.send(cohort);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cohort not found with id " + req.params.cohortId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.cohortId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Cohort.findByIdAndRemove(req.params.cohortId)
    .then(cohort => {
        if(!cohort) {
            return res.status(404).send({
                message: "Cohort not found with id " + req.params.cohortId
            });
        }
        res.send({message: "Cohort deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Cohort not found with id " + req.params.cohortId
            });                
        }
        return res.status(500).send({
            message: "Could not delete cohort with id " + req.params.cohortId
        });
    });
};