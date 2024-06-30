const mongoose = require("mongoose");
 
const ProjectSchema= new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            required:true,
        },
        startDate:{
            type:Date,
            required:true,
        },
        endDate:{
            type:Date,
        },
    },
    {
        collection: "Project",        
        versionKey: false,
        timestamps: true,
    }
);

module.exports = ProjectSchema;
