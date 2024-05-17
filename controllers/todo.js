const taskSchema = require('../models/task')
const {slugify} = require("../utils/slugify");
const {sendError} = require("../utils/error")
const {isValidObjectId} = require("mongoose");


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

exports.all = async (req, res) => {
    const allTask = await taskSchema.find({})
    res.json(allTask)
}

exports.remove = async (req, res) => {
    const {id} = req.params;
    if (!isValidObjectId(id)) return sendError(res, "Invalid Task ID");
    if (!id) return sendError(res, "Please provide an id", 404)
    const taskId = await taskSchema.findById({_id: id})
    if (!taskId) return sendError(res, "Given Task Not Found", 404)
    await taskSchema.findByIdAndDelete({_id: id})
    res.json({message: "Task removed successfully"});
}

exports.patch = async (req, res) => {
    const {title, status} = req.body;
    const {id} = req.params;

    if (!isValidObjectId(id)) return sendError(res, "Blog ID not valid", 404);

    const task = await taskSchema.findById({_id: id});
    if (!task) return sendError(res, "Task not found", 404);

    if (title && title !== task.title) task.slug = await slugify(title, taskSchema);

    if (title) task.title = title;
    if(status) task.status = status;

    await task.save();
    const updatedTask = await taskSchema.findById({_id: id})

    res.json(updatedTask);
}