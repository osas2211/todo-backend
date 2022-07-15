const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
	task: {
		type: String,
		required: [true, "task is required"],
		maxLength: [30, "length exceeds max-length(30)"],
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
})

module.exports = mongoose.model("Task", TaskSchema)
