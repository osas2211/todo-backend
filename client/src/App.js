import { Typography, Container } from "@mui/material"
import { HomePage } from "./pages/homepage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import { EditPage } from "./pages/editPage"
import { TasksProvider } from "./context/tasks"

function App() {
	return (
		<div className="App">
			<Typography
				align="center"
				component={"h4"}
				variant={"h4"}
				sx={{ marginY: 2, color: "#fff" }}
			>
				#todo
			</Typography>
			<Container maxWidth={"sm"}>
				<TasksProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/edit/:id" element={<EditPage />} />
						</Routes>
					</BrowserRouter>
				</TasksProvider>
			</Container>
		</div>
	)
}

export default App
