const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        writerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        writer: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
    },
    {
        collection: "Comment",
        versionKey: false,
        timestamps: true,
    }
);

module.exports = CommentSchema;