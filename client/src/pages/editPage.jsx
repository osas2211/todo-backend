import { Box, Button, TextField, Typography } from "@mui/material"
import React, { useContext, useState } from "react"
import { actions, TasksContext } from "../context/tasks"
import { useParams, useNavigate } from "react-router-dom"

export const EditPage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { state, dispatch } = useContext(TasksContext)
	const task = state.data.filter((task) => task.id === Number(id))[0]
	const [input, setInput] = useState(task.task)
	return (
		<>
			<Typography
				variant="h5"
				align="center"
				sx={{
					marginY: 3,
					color: "#fff",
				}}
			>
				EDIT TASK: {id}
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
				}}
			>
				<TextField
					label="Edit Task"
					focused
					value={input}
					onChange={(e) => {
						setInput(e.target.value)
					}}
					sx={{
						input: {
							color: "#fff",
							width: "100%",
							display: "block",
							paddingY: 1,
						},
						width: "75%",
					}}
				></TextField>
				<Button
					variant="contained"
					sx={{ width: "20%", paddingY: 1 }}
					size="medium"
					onClick={() => {
						dispatch({
							type: actions.UPDATE_TASK,
							payload: {
								task: input,
								id: Number(id),
							},
						})
						navigate(-1)
					}}
				>
					Edit
				</Button>
			</Box>
		</>
	)
}
