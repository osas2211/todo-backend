import React, { useContext } from "react"
import {
	FormGroup,
	FormControlLabel,
	Checkbox,
	Box,
	IconButton,
	Typography,
} from "@mui/material"
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone"
import DeleteIcon from "@mui/icons-material/Delete"
import { Link } from "react-router-dom"
import { TasksContext, actions } from "../context/tasks"
import axios from "axios"

export const Tasks = ({ filter }) => {
	const { state, dispatch } = useContext(TasksContext)
	let tasks
	if (filter !== undefined) {
		tasks = state.data.filter((task) => task.completed === filter)
	} else {
		tasks = state.data
	}
	const Delete = async (id) => {
		try {
			await axios
				.delete(`/api/v1/tasks/${id}`)
				.then((data) => console.log(data.data))
		} catch (error) {
			console.log(error.message)
		}
	}
	const updateCompleted = async (id, completed) => {
		try {
			await axios.patch(`/api/v1/tasks/${id}`, {
				completed: completed === false ? true : false,
			})
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Box sx={{ marginY: 3 }}>
			{tasks.length === 0 ? (
				<Typography align="center" color={"#fff"}>
					NO TASK AVAILABLE
				</Typography>
			) : (
				tasks.map((task) => {
					return (
						<FormGroup key={task._id}>
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
											payload: { completed: task.completed, id: task._id },
										})
										updateCompleted(task._id, task.completed)
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
										<Link to={`/edit/${task._id}`} style={{ color: "inherit" }}>
											<EditTwoToneIcon />
										</Link>
									</IconButton>
									<IconButton
										color="error"
										onClick={() => {
											Delete(task._id)
											dispatch({
												type: actions.DELETE_TASK,
												payload: { id: task._id },
											})
										}}
									>
										<DeleteIcon />
									</IconButton>
								</Box>
							</Box>
						</FormGroup>
					)
				})
			)}
		</Box>
	)
}
