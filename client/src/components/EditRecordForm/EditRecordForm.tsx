import { useState, Dispatch, SetStateAction } from "react";
import "./style.css";
import { TextField, Stack, Button } from "@mui/material";
import Swal from "sweetalert2";

interface Props {
	handleModal: () => void;
	updateRecord: () => void;
	updatePlateNumber: string;
	updateOwner: string;
	setUpdatePlateNumber: Dispatch<SetStateAction<string>>;
	setUpdateOwner: Dispatch<SetStateAction<string>>;
}

const EditRecordForm = ({ handleModal, updateRecord, updatePlateNumber, setUpdatePlateNumber, updateOwner, setUpdateOwner }: Props) => {
	//State
	const [valid, setIsValid] = useState(true);

	// function to validate inputed plate numbers
	const handleValidation = (str: string) => {
		//number plate regex: 0(0001)-X-0(1)
		const plateRegex: any = /^[0-9]{1,5}-[A-Z]{1}-[0-9]{1,2}$/;
		setIsValid(plateRegex.test(str));
		setUpdatePlateNumber(str);
	};

	// Update
	const handleUpdate = () => {
		// check if fileds are empty
		if (updatePlateNumber === "" || updateOwner === "") {
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
					title: "Record has been succesfully updated.",
				});
				updateRecord();
				handleModal();
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...Try again",
					text: "Could not update record: Incorrect number plate format.",
				});
			}
		}
	};
	return (
		<div style={{ minWidth: 500 }}>
			<div className="modal-header">
				<h2>Update Record</h2>
			</div>
			<div className="wrapper">
				<TextField
					inputProps={{ "data-testid": "update-record-input" }}
					fullWidth
					style={{ width: 300 }}
					type="text"
					required={true}
					id="outlined-basic"
					label="Plate number"
					variant="outlined"
					value={updatePlateNumber}
					onChange={(e) => handleValidation(e.target.value)}
					error={!valid}
					helperText={"The registration plate number should follow the pattern: 0(0001)-X-0(1), e.g: 1(2345)-A-6(7)"}
				/>
				<br />

				<TextField
					inputProps={{ "data-testid": "update-owner-input" }}
					fullWidth
					style={{ width: 300 }}
					type="text"
					required={true}
					id="outlined-basic"
					label="Owner"
					variant="outlined"
					value={updateOwner}
					onChange={(e) => setUpdateOwner(e.target.value)}
				/>
				<br />
			</div>

			<div className="button-wrapper">
				<Stack direction="row" spacing={2}>
					<Button data-testid="cancel-update-btn" variant="outlined" color="error" onClick={handleModal}>
						Cancel
					</Button>
					<Button data-testid="confirm-update-btn" variant="contained" color="success" onClick={handleUpdate}>
						Update
					</Button>
				</Stack>
			</div>
		</div>
	);
};

export default EditRecordForm;
