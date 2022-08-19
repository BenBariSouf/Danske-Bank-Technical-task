import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div style={{ textAlign: "center" }}>
			<div style={{ display: " flex", justifyContent: "center", alignItems: "center", paddingTop: "20%" }}>
				<h1>Page not found</h1>
			</div>
			<Link to="/">Go Back</Link>
		</div>
	);
};

export default NotFound;
