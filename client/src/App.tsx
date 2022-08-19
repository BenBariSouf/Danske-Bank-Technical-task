import { Routes, Route } from "react-router-dom";

import "./App.css";
import Records from "./pages/Records/Records";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Records />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
