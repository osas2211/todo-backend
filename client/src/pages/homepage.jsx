import React from "react"
import PropTypes from "prop-types"
import { Box, Typography, Tabs, Tab } from "@mui/material"
import { AddTask } from "../components/AddTask"
import { Tasks } from "../components/tasks"

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	}
}

export const HomePage = () => {
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	return (
		<Box width={"100%"}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					textColor={"inherit"}
					variant="fullWidth"
					sx={{
						color: "#fff",
					}}
				>
					<Tab label="All" {...a11yProps(0)} />
					<Tab label="Active" {...a11yProps(1)} />
					<Tab label="Completed" {...a11yProps(2)} />
				</Tabs>
			</Box>
			<Box>
				<TabPanel value={value} index={0}>
					<AddTask />
					<Tasks />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<AddTask />
					<Tasks filter={false} />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Tasks filter={true} />
				</TabPanel>
			</Box>
		</Box>
	)
}
