const mongoose = require ("mongoose");

const EventSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    eventDate: {
        type: Date
    },
    photos: {
        type: Array
    },
    privacy:{
        type: Boolean
    },
    accessibility:{
        type: Boolean 
    },
    accessibilityDescription:{
        type: String 
    },
    userId:{
        type: mongoose.ObjectId
    }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event

