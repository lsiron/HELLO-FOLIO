const mongoose = require("mongoose");

const AwardSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        organization: {
            type: String,
            required: true,
        },
        getDate: {
            type: Date,
            required: true,
        },
    },
    {
        collection: "Award",
        versionKey: false,
        timestamps: true,
    }
);

module.exports = AwardSchema;