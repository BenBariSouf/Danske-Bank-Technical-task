import { render, screen } from "@testing-library/react";
import CreateRecordForm from "../CreateRecordForm";

const mockedPlateNumberValue = jest.fn();
const mockedOwnerValue = jest.fn();
const mockedUpdateID = jest.fn();
const mockedShowForm = jest.fn();

describe("CreateRecordForm", () => {
	it("should render input field necessary to add a new record plate number", () => {
		render(
			<CreateRecordForm
				addRecord={() => {}}
				inputPlateNumberValue={""}
				inputOwnerValue={""}
				setPlateNumberValue={mockedPlateNumberValue}
				setOwnerValue={mockedOwnerValue}
				setUpdateID={mockedUpdateID}
				setShowForm={mockedShowForm}
			/>
		);
		const input = screen.getByTestId("create-record-input");
		expect(input).toBeInTheDocument();
	});

	it("should render input field necessary to add a new record owner", () => {
		render(
			<CreateRecordForm
				addRecord={() => {}}
				inputPlateNumberValue={""}
				inputOwnerValue={""}
				setPlateNumberValue={mockedPlateNumberValue}
				setOwnerValue={mockedOwnerValue}
				setUpdateID={mockedUpdateID}
				setShowForm={mockedShowForm}
			/>
		);
		const input = screen.getByTestId("create-owner-input");
		expect(input).toBeInTheDocument();
	});

	it("should render the 'Save Record' button used to add a new record", () => {
		render(
			<CreateRecordForm
				addRecord={() => {}}
				inputPlateNumberValue={""}
				inputOwnerValue={""}
				setPlateNumberValue={mockedPlateNumberValue}
				setOwnerValue={mockedOwnerValue}
				setUpdateID={mockedUpdateID}
				setShowForm={mockedShowForm}
			/>
		);
		const btn = screen.getByTestId("create-record-btn");
		expect(btn).toBeInTheDocument();
	});

	it("should render the 'Cancel' button used to cancel adding a new record", () => {
		render(
			<CreateRecordForm
				addRecord={() => {}}
				inputPlateNumberValue={""}
				inputOwnerValue={""}
				setPlateNumberValue={mockedPlateNumberValue}
				setOwnerValue={mockedOwnerValue}
				setUpdateID={mockedUpdateID}
				setShowForm={mockedShowForm}
			/>
		);
		const btn = screen.getByTestId("cancel-create-btn");
		expect(btn).toBeInTheDocument();
	});

	it("should check if the input field to create plate number is required", () => {
		render(
			<CreateRecordForm
				addRecord={() => {}}
				inputPlateNumberValue={""}
				inputOwnerValue={""}
				setPlateNumberValue={mockedPlateNumberValue}
				setOwnerValue={mockedOwnerValue}
				setUpdateID={mockedUpdateID}
				setShowForm={mockedShowForm}
			/>
		);
		const input = screen.getByTestId("create-record-input");
		expect(input).toBeRequired();
	});

	it("should check if the input field to create owner name is required", () => {
		render(
			<CreateRecordForm
				addRecord={() => {}}
				inputPlateNumberValue={""}
				inputOwnerValue={""}
				setPlateNumberValue={mockedPlateNumberValue}
				setOwnerValue={mockedOwnerValue}
				setUpdateID={mockedUpdateID}
				setShowForm={mockedShowForm}
			/>
		);
		const input = screen.getByTestId("create-owner-input");
		expect(input).toBeRequired();
	});
});
