const mongoose = require('mongoose');

const CohortSchema = mongoose.Schema({
    title: String,
    criteria: String,
    submissionLink: String,
	startDate: Date,
	expiryDate: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Cohorts', CohortSchema);