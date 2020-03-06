const mongoose = require('mongoose');

const CriteriaSchema = mongoose.Schema({
    title: String,
    criteriaData: [
        {
            criterionTitle:String,
            statements:[
                {statement:String,
                score: Number}
            ]

        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Criteria', CriteriaSchema);