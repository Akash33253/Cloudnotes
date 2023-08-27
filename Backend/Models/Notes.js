const mongoose = require('mongoose');
const notesSchema = mongoose.Schema({
    user : {
        type :mongoose.Schema.Types.ObjectId, // act as foreisgn key
        ref  :  'user'
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tag : {
        type : String,
        default : "General"
    },
    date : {
        type : Date,
        default : Date.now
    }
})

const Notes = mongoose.model("notesModel",notesSchema);

module.exports = Notes;