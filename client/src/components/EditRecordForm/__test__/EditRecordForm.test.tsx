import { render, screen } from "@testing-library/react";
import EditRecordForm from "../EditRecordForm";

const mockedPlateNumber = jest.fn();
const mockedOwner = jest.fn();

describe("EditRecordForm", () => {
	it("should render input field used to edit a record plate number ", () => {
		render(
			<EditRecordForm
				handleModal={() => {}}
				updateRecord={() => {}}
				updatePlateNumber={""}
				updateOwner={""}
				setUpdatePlateNumber={mockedPlateNumber}
				setUpdateOwner={mockedOwner}
			/>
		);
		const input = screen.getByTestId("update-record-input");
		expect(input).toBeInTheDocument();
	});

	it("should render input field used to edit a record owner name", () => {
		render(
			<EditRecordForm
				handleModal={() => {}}
				updateRecord={() => {}}
				updatePlateNumber={""}
				updateOwner={""}
				setUpdatePlateNumber={mockedPlateNumber}
				setUpdateOwner={mockedOwner}
			/>
		);
		const input = screen.getByTestId("update-owner-input");
		expect(input).toBeInTheDocument();
	});

	it("should check if the input field to update plate number is required", () => {
		render(
			<EditRecordForm
				handleModal={() => {}}
				updateRecord={() => {}}
				updatePlateNumber={""}
				updateOwner={""}
				setUpdatePlateNumber={mockedPlateNumber}
				setUpdateOwner={mockedOwner}
			/>
		);

		const input = screen.getByTestId("update-record-input");
		expect(input).toBeRequired();
	});

	it("should check if the input field to update owner name is required ", () => {
		render(
			<EditRecordForm
				handleModal={() => {}}
				updateRecord={() => {}}
				updatePlateNumber={""}
				updateOwner={""}
				setUpdatePlateNumber={mockedPlateNumber}
				setUpdateOwner={mockedOwner}
			/>
		);

		const input = screen.getByTestId("update-owner-input");
		expect(input).toBeRequired();
	});

	it("should render the 'Update' button used to update a record", () => {
		render(
			<EditRecordForm
				handleModal={() => {}}
				updateRecord={() => {}}
				updatePlateNumber={""}
				updateOwner={""}
				setUpdatePlateNumber={mockedPlateNumber}
				setUpdateOwner={mockedOwner}
			/>
		);
		const btn = screen.getByTestId("confirm-update-btn");
		expect(btn).toBeInTheDocument();
	});

	it("should render the 'Cancel' button used to cancel updating", () => {
		render(
			<EditRecordForm
				handleModal={() => {}}
				updateRecord={() => {}}
				updatePlateNumber={""}
				updateOwner={""}
				setUpdatePlateNumber={mockedPlateNumber}
				setUpdateOwner={mockedOwner}
			/>
		);
		const btn = screen.getByTestId("cancel-update-btn");
		expect(btn).toBeInTheDocument();
	});
});
