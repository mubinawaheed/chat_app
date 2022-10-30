const mongoose = require('mongoose')
const { Schema } = mongoose

const MsgSchema = new Schema({
    username: {
        required: true,
        type: String
    },
    msg: {
        required: true,
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Msgs_db = mongoose.model('MsgsDB', MsgSchema);
module.exports = Msgs_db