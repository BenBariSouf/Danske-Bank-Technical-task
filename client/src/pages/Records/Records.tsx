import { useState } from "react";
import { Container, Paper, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import Swal from "sweetalert2";
import { v1 as uuidv1 } from "uuid";
import axios from "axios";
import { CreateRecordForm, Header, EditRecordForm } from "../../components";
import Data from "../../data.json";
import Modal from "react-modal";

// api port
const PORT = process.env.REACT_APP_PORT || 8000;

interface Record {
	id: string;
	plateNumber: string;
	owner: string;
	created_on: Date;
}

const Records = () => {
	// State
	const [data, setData] = useState<Record | any>(Data);
	const [plateNumber, setPlateNumber] = useState("");
	const [owner, setOwner] = useState("");
	const [updateID, setUpdateID] = useState("");
	const [updatePlateNumber, setUpdatePlateNumber] = useState("");
	const [updateOwner, setUpdateOwner] = useState("");
	const [creationDate, setCreationDate] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [showForm, setShowForm] = useState(false);

	// edit modal show/hide function
	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	//table pagination logic
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	// Add Record
	//////////////////////////////////////////
	const addRecord = () => {
		let numbers: Array<string> = [];
		data.forEach((record: any) => {
			numbers.push(record.plateNumber);
		});

		if (plateNumber && owner) {
			// create new record object
			let newRecord = {
				id: uuidv1(),
				plateNumber, //es6 shorthand for plateNumber: plateNumber
				owner, //es6 shorthand for owner: owner
				created_on: new Date(),
			};

			// check for duplicates: Only unique car number plates should be added
			if (!numbers.includes(newRecord.plateNumber)) {
				// merge new record with copy of old state
				let records = [...data, newRecord];
				// push new object to state
				setData(records);
				// update write to json file
				saveJson(records);
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "This Record already exists!",
				});
			}
		}
	};

	// Delete Record
	////////////////////////////////////////
	const deleteRecord = (key: string) => {
		// Removing should be only done with confirmation
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				// filter out record containing that id
				let filteredRecords = [...data].filter((a) => a.id !== key);
				// save the rest in state
				setData(filteredRecords);
				// update write to json file
				saveJson(filteredRecords);
				Swal.fire("Deleted!", "Record has been deleted.", "success");
			}
		});
	};

	// Populate Post
	//////////////////////////////////////////
	const populateRecord = (id: string, number: string, owner: string, created_on: Date) => {
		setUpdateID(id);
		setUpdatePlateNumber(number);
		setUpdateOwner(owner);
		setCreationDate(created_on.toString());
	};

	// Update Record
	//////////////////////////////////////////
	const updateRecord = () => {
		// populate record info from temp state and prepare new object for changed record
		let editedRecord = {
			id: updateID,
			plateNumber: updatePlateNumber,
			owner: updateOwner,
			created_on: creationDate,
		};
		// // remove old record with same ID and get the remaining data /// filter
		let filterRecords = [...data].filter((a) => a.id !== updateID);

		// // prepare object with edited record + remaining data from object above
		let records = [...filterRecords, editedRecord];
		// // push into state
		setData(records);
		// // update write to json file
		saveJson(records);
	};

	// Write to JSON File
	//////////////////////////////////////////
	// this function will receive all updated state / posts after you add, edit delete record
	const saveJson = (records: any) => {
		// api URL // end point from node server / express server
		const url = `http://localhost:${PORT}/write`;

		axios
			.post(url, records)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	return (
		<Container maxWidth="lg" sx={{ mt: 5 }}>
			<Paper sx={{ mb: 8 }}>
				<Box display="flex">
					<Box flexGrow={1}>
						<Box>
							{/* Create Record */}
							{showForm && (
								<CreateRecordForm
									inputPlateNumberValue={plateNumber}
									inputOwnerValue={owner}
									setPlateNumberValue={setPlateNumber}
									setOwnerValue={setOwner}
									addRecord={addRecord}
									setUpdateID={setUpdateID}
									setShowForm={setShowForm}
								/>
							)}
						</Box>
						<Box flexGrow={1}>
							<Header showForm={showForm} setShowForm={setShowForm} setSearchTerm={setSearchTerm} />
						</Box>
					</Box>
				</Box>

				{/* Edit record Modal */}
				<Modal isOpen={isOpen} onRequestClose={toggleModal} contentLabel="My dialog" className="mymodal" overlayClassName="myoverlay" closeTimeoutMS={400} ariaHideApp={false}>
					<EditRecordForm
						handleModal={toggleModal}
						updatePlateNumber={updatePlateNumber}
						setUpdatePlateNumber={setUpdatePlateNumber}
						updateOwner={updateOwner}
						setUpdateOwner={setUpdateOwner}
						updateRecord={updateRecord}
					/>
				</Modal>

				{/* Records table  */}
				<TableContainer component={Paper} sx={{ mt: 10, mb: 1 }}>
					<Table aria-label=" records table">
						{data?.length > 0 && (
							<TableHead>
								<TableRow>
									<TableCell data-testid="table-head" align="right">
										#
									</TableCell>
									<TableCell data-testid="table-head" align="center">
										Plate Number
									</TableCell>
									<TableCell data-testid="table-head" align="center">
										Owner Name
									</TableCell>
									<TableCell data-testid="table-head" align="center">
										Created On
									</TableCell>
									<TableCell data-testid="table-head" align="center">
										Actions
									</TableCell>
								</TableRow>
							</TableHead>
						)}
						<TableBody>
							{data && data.length > 0 ? (
								// search capability based on both plate numbers and owner names
								data
									.filter((val: any) => {
										if (searchTerm === "") return val;
										if (val.owner.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.plateNumber.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
											return val;
										}
									})
									//sort records by their owner names in alphabetical order
									.sort((a: any, b: any) => a.owner.toLowerCase().localeCompare(b.owner.toLowerCase(), "en", { sensitivity: "base" }))
									//slice records array for use in the table pagination
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									//map through sorted records and render them
									.map(({ id, plateNumber, owner, created_on }: Record, index: number) => {
										let creationDate = new Date(created_on);
										return (
											<TableRow key={id}>
												<TableCell data-testid="record-attr" align="right">
													{index + 1}
												</TableCell>
												<TableCell data-testid="record-attr" align="center">
													{plateNumber}
												</TableCell>
												<TableCell data-testid="record-attr" align="center">
													{owner}
												</TableCell>
												<TableCell data-testid="record-attr" align="center">
													<span>{created_on && creationDate.getFullYear() + "-" + (creationDate.getMonth() + 1) + "-" + creationDate.getDate()}</span>
												</TableCell>
												<TableCell align="center">
													<Button
														data-testid="record-edit-btn"
														variant="outlined"
														color="success"
														size="small"
														startIcon={<EditIcon />}
														onClick={() => {
															populateRecord(id, plateNumber, owner, created_on);
															toggleModal();
														}}
													>
														Edit
													</Button>
													<Button
														data-testid="record-delete-btn"
														variant="outlined"
														color="warning"
														size="small"
														startIcon={<DeleteIcon />}
														sx={{ ml: 2 }}
														onClick={() => deleteRecord(id)}
													>
														Delete
													</Button>
												</TableCell>
											</TableRow>
										);
									})
							) : (
								<TableRow>
									<TableCell align="center">
										<h2 data-testid="no-avail-records" style={{ textAlign: "center" }}>
											No records available
										</h2>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{/* table pagination */}
				{data?.length > 0 && (
					<TablePagination
						data-testid="table-pagination"
						rowsPerPageOptions={[10, 25, 100, { label: "All", value: data.length }]}
						component="div"
						count={data.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				)}
			</Paper>
		</Container>
	);
};

export default Records;
