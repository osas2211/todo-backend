import React, { useContext } from "react"
import axios from "axios"
import {
	FormGroup,
	FormControlLabel,
	Checkbox,
	Box,
	IconButton,
} from "@mui/material"
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone"
import DeleteIcon from "@mui/icons-material/Delete"
import { Link } from "react-router-dom"
import { TasksContext, actions } from "../context/tasks"

export const Tasks = ({ filter }) => {
	const { state, dispatch } = useContext(TasksContext)
	const getTask = async () => {
		try {
			const res = await axios.get("/api/v1/tasks")
			const tasks = await res.data
			return tasks
		} catch (error) {
			console.log(error.message)
		}
	}
	console.log(getTask())
	let tasks
	if (filter !== undefined) {
		tasks = state.data.filter((task) => task.completed === filter)
	} else {
		tasks = state.data
	}
	return (
		<Box sx={{ marginY: 3 }}>
			{tasks.map((task) => {
				return (
					<FormGroup>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<FormControlLabel
								onChange={() => {
									dispatch({
										type: actions.UPDATE_TASK,
										payload: { completed: task.completed, id: task.id },
									})
								}}
								control={
									<Checkbox
										checked={task.completed}
										sx={{
											color: "#fff",
										}}
									/>
								}
								label={task.task}
								sx={{
									color: "#fff",
								}}
							/>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<IconButton color="success">
									<Link to={`/edit/${task.id}`} style={{ color: "inherit" }}>
										<EditTwoToneIcon />
									</Link>
								</IconButton>
								<IconButton
									color="error"
									onClick={() => {
										dispatch({
											type: actions.DELETE_TASK,
											payload: { id: task.id },
										})
									}}
								>
									<DeleteIcon />
								</IconButton>
							</Box>
						</Box>
					</FormGroup>
				)
			})}
		</Box>
	)
}
