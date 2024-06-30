const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
    },
    {
        collection: "Info",        
        versionKey: false,
        timestamps: true,
    }
);


module.exports = InfoSchema;
