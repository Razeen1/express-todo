const taskSchema = require('../models/task')
const {slugify} = require("../utils/slugify");
const {sendError} = require("../utils/error")
const { isValidObjectId } = require("mongoose");


exports.create = async (req, res) => {
    const {title} = req.body;
    if (!title) {
        sendError(res, 'Title cannot be empty', 400)
    } else {
        const status = "Not-completed"
        const slug = await slugify(title, taskSchema);
        const task = new taskSchema({
            title,
            slug,
            status
        });
        await task.save();
        res.json({
            slug,
            success: true,
            message: "Task added Successfully",
        });
    }
};

exports.getAllTask = async (req, res) => {
    const allTask = await taskSchema.find({})
    res.json(allTask)
}

exports.deleteTask = async (req, res) => {
    const {id} = req.params;
      if (!isValidObjectId(id)) return sendError(res, "Invalid Blog ID");
    if(!id) return sendError(res, "Please provide an id", 404)
    const taskId = await taskSchema.findById({_id:id})
    if (!taskId) return sendError(res, "Given Task Not Found", 404)
    await taskSchema.findByIdAndDelete({_id:id})
    res.json({message: "Task removed successfully"});
}