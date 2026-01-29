const mongoose = require ('mongoose');

const pollSchema = new mongoose.Schema({
    questions:{
        type: String,
        required: true
    },
    options:[
        {
            text:{
                type:String,
                required: true
            },
            votes:{
                type: Number,
                default: 0
            }
        }
    ],
    voters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }
})
module.exports = mongoose.model('Poll',pollSchema);
