import { render, screen } from "@testing-library/react";
import Header from "../Header";

const mockedShowForm = jest.fn();
const mockedSearchTerm = jest.fn();

describe("Header", () => {
	it("should render the add record button", () => {
		render(<Header showForm={false} setShowForm={mockedShowForm} setSearchTerm={mockedSearchTerm} />);
		const addBtn = screen.getByTestId("add-record-btn");
		expect(addBtn).toBeInTheDocument();
	});

	it("should render the search input field", () => {
		render(<Header showForm={false} setShowForm={mockedShowForm} setSearchTerm={mockedSearchTerm} />);
		const searchInput = screen.getByPlaceholderText("Search…");
		expect(searchInput).toBeInTheDocument();
	});
});
