const mongoose = require('mongoose')

const contentSchema = mongoose.Schema(
    {
        Abstract: {
            type: String,
            required: true
        },
        AgeRating: {
            type: Number,
            required: true
        },
        AvailabilityFromUtcIso: {
            type: Date,
            default: new Date()
        },
        BackgroundUrl: {
            type: String,
            required: true
        },
        Cast: {
            type: String,
            default: ''
        },
        Category: {
            type: String,
            enum: ['SERIES', 'MOVIE'],
            required: true
        },
        Director: {
            type: String,
            default: ''
        },
        EditedAbstract: {
            type: String,
            default: ''
        },
        Genre: {
            type: String,
            required: true,
            enum: ['dráma', 'akció', 'vígjáték']
        },
        Name: {
            type: String,
            required: true,
            unique: true
        },
        ProductionYear: {
            type: Number,
            required: true
        }
    }
)

contentSchema.virtual('Id').get(function () {
    return this._id.toHexString()
})

contentSchema.set('toJSON', {
    virtuals: true
})

const Content = mongoose.model('Content', contentSchema)

module.exports = Content
