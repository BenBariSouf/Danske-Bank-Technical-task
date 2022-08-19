import "./style.css";
import { useState, Dispatch, SetStateAction } from "react";
import { Box, Paper, TextField, Stack, Button } from "@mui/material";
import Swal from "sweetalert2";

interface Props {
	addRecord: () => void;
	inputPlateNumberValue: string;
	inputOwnerValue: string;
	setPlateNumberValue: Dispatch<SetStateAction<string>>;
	setOwnerValue: Dispatch<SetStateAction<string>>;
	setUpdateID: Dispatch<SetStateAction<string>>;
	setShowForm: Dispatch<SetStateAction<boolean>>;
}

const CreateRecordForm = ({ addRecord, inputPlateNumberValue, inputOwnerValue, setPlateNumberValue, setOwnerValue, setUpdateID, setShowForm }: Props) => {
	//State
	const [valid, setIsValid] = useState(false);

	// function to validate inputed plate numbers
	const handleValidation = (str: string) => {
		//number plate regex: 0(0001)-X-0(1)
		const plateRegex: any = /^[0-9]{1,5}-[A-Z]{1}-[0-9]{1,2}$/;
		setIsValid(plateRegex.test(str));
		setPlateNumberValue(str);
	};

	const clearInput = () => {
		setPlateNumberValue("");
		setOwnerValue("");
		setShowForm(false);
	};

	// Create
	const createRecord = () => {
		// check if fileds are empty
		if (inputPlateNumberValue === "" || inputOwnerValue === "") {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Please fill both required fields correctly",
			});
		} else {
			if (valid) {
				const Toast = Swal.mixin({
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
					didOpen: (toast) => {
						toast.addEventListener("mouseenter", Swal.stopTimer);
						toast.addEventListener("mouseleave", Swal.resumeTimer);
					},
				});
				Toast.fire({
					icon: "success",
					title: "New record succesfully added.",
				});

				addRecord();
				setUpdateID("");
				clearInput();
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...Try again",
					text: "Could not save record: Incorrect number plate format.",
				});
			}
		}
	};

	return (
		<Paper elevation={15} sx={{ pt: 1 }}>
			<div className="header">
				<h2 data-testid="add-text">Add a new Record</h2>
			</div>
			<Box
				display="flex"
				component="form"
				sx={{
					"& > :not(style)": { m: 4 },
				}}
				noValidate
				autoComplete="off"
			>
				<div className="input-wrapper">
					<div>
						<TextField
							inputProps={{ "data-testid": "create-record-input" }}
							fullWidth
							style={{ width: 300 }}
							type="text"
							required={true}
							id="outlined-basic"
							label="Plate number"
							variant="outlined"
							value={inputPlateNumberValue}
							onChange={(e) => handleValidation(e.target.value)}
							error={inputPlateNumberValue === "" ? false : !valid}
							helperText={"The registration plate number should follow the pattern: 0(0001)-X-0(1), e.g: 1(2345)-A-6(7)"}
						/>
					</div>
					<div>
						<TextField
							inputProps={{ "data-testid": "create-owner-input" }}
							type="text"
							required={true}
							style={{ width: 300 }}
							id="outlined-basic"
							label="Owner Name"
							variant="outlined"
							value={inputOwnerValue}
							name="owner"
							onChange={(e) => setOwnerValue(e.target.value)}
						/>
					</div>
				</div>
			</Box>

			<div className="button-wrapper">
				<Stack direction="row" spacing={2}>
					<Button data-testid="cancel-create-btn" variant="outlined" color="error" onClick={clearInput}>
						Cancel
					</Button>
					<Button data-testid="create-record-btn" variant="contained" color="success" onClick={createRecord}>
						Save Record
					</Button>
				</Stack>
			</div>
		</Paper>
	);
};

export default CreateRecordForm;
