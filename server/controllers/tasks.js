const taskModel = require("../models/tasks")

const getTasks = async (req, res) => {
	try {
		const tasks = await taskModel.find({})
		return res.status(200).json({ success: true, data: tasks })
	} catch (error) {
		return res.status(404).json({ success: false, message: error })
	}
}

const createTask = async (req, res) => {
	try {
		const task = await taskModel.create(req.body)
		return res.status(201).json({ success: true, data: task })
	} catch (error) {
		return res.status(500).json({ success: false, message: error })
	}
}

const getTask = async (req, res) => {
	const { id } = req.params
	try {
		const task = await taskModel.findOne({ _id: id })
		if (!task) {
			return res.status(404).json({ success: false, message: "Task not Found" })
		}
		return res.status(200).json({ success: true, data: task })
	} catch (error) {
		return res.status(500).json({ success: false, message: error })
	}
}

const updateTask = async (req, res) => {
	const { id } = req.params
	try {
		const task = await taskModel.findOneAndUpdate({ _id: id }, req.body, {
			new: true,
			runValidators: true,
		})
		if (!task) {
			return res.status(404).json({ success: false, message: "Task not Found" })
		}
		return res.status(200).json({ success: true, data: task })
	} catch (error) {
		return res.status(500).json({ success: false, message: error })
	}
}

const deleteTask = async (req, res) => {
  const { id } = req.params
	try {
    const task = await taskModel.findOneAndDelete({ _id: id })
		if (!task) {
			return res.status(404).json({ success: false, message: "Task not Found" })
		}
    return res.status(200).json({ success: true, data: task })
  } catch (error) {
    return res.status(500).json({ success: false, message: error })
  }
}

module.exports = {
	getTask,
	createTask,
	getTasks,
	updateTask,
	deleteTask,
}
