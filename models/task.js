const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        title: {type: String, trim: true, required: true},
        slug: {type: String, trim: true, required: true, unique: true},
        status: {type: String, required: true, enum: ["Completed", "Not-completed"]},
    },
    {timestamps: true}
);

taskSchema.index({name: "text"});

module.exports = mongoose.model("Task", taskSchema);