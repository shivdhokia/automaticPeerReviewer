const mongoose = require('mongoose');

const CriteriaSchema = mongoose.Schema({
    title: String,
    criteriaData: [
        {
            title:String,
            statements:[
                {statment:String,
                score: Number}
            ]

        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Criteria', CriteriaSchema);