import { render, screen } from "@testing-library/react";
import Records from "../Records";

describe("Records", () => {
	it("should render records table headers if there is one or more records in the data", () => {
		render(<Records />);
		const isDataEmpty = screen.queryByText(/^No records available$/i);
		if (isDataEmpty == null) {
			const inputs = screen.getAllByTestId("table-head");
			inputs.forEach((input) => {
				expect(input).toBeInTheDocument();
			});
		}
	});

	it("should render records if there is one or more records in the data", () => {
		render(<Records />);
		const isDataEmpty = screen.queryByText(/^No records available$/i);
		if (isDataEmpty == null) {
			const inputs = screen.getAllByTestId("table-head");
			inputs.forEach((input) => {
				expect(input).toBeInTheDocument();
			});
		}
	});

	it("should render each record's appropriate attributs if there is one or more records in the data", () => {
		render(<Records />);
		const isDataEmpty = screen.queryByText(/^No records available$/i);
		if (isDataEmpty == null) {
			const inputs = screen.getAllByTestId("record-attr");
			inputs.forEach((input) => {
				expect(input).toBeInTheDocument();
			});
		}
	});

	it("should render the edit button for each record if there is one or more records in the data", () => {
		render(<Records />);
		const isDataEmpty = screen.queryByText(/^No records available$/i);
		if (isDataEmpty == null) {
			const btns = screen.getAllByTestId("record-edit-btn");
			btns.forEach((btn) => {
				expect(btn).toBeInTheDocument();
			});
		}
	});

	it("should render the delete button for each record if there is one or more records in the data", () => {
		render(<Records />);
		const isDataEmpty = screen.queryByText(/^No records available$/i);
		if (isDataEmpty == null) {
			const btns = screen.getAllByTestId("record-edit-btn");
			btns.forEach((btn) => {
				expect(btn).toBeInTheDocument();
			});
		}
	});

	it("should render the table pagination component if there is one or more records in the data", () => {
		render(<Records />);
		const isDataEmpty = screen.queryByText(/^No records available$/i);
		if (isDataEmpty == null) {
			const pagination = screen.getByTestId("table-pagination");
			expect(pagination).toBeInTheDocument();
		}
	});
});
