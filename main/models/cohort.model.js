const mongoose = require('mongoose');

const CohortSchema = mongoose.Schema({
    title: String,
    criteria: String,
    submission: Number,
	startDate: Date,
	expiryDate: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Cohorts', CohortSchema);