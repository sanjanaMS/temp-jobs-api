const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'provide company name'],
        maxlength: 50
    },
    position: {
        type: String,
        enum: ['interview', 'declined', 'pending', 'intern', 'front-end', 'back-end'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide user']
    }


}, { timestamps: true })


module.exports = mongoose.model('Job', jobSchema)