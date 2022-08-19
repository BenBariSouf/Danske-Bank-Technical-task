import { Dispatch, SetStateAction } from "react";
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Button, Toolbar, Typography, InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

interface Props {
	showForm: boolean;
	setShowForm: Dispatch<SetStateAction<boolean>>;
	setSearchTerm: Dispatch<SetStateAction<string>>;
}
//search input styling
const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "30ch",
			},
		},
	},
}));

const Header = ({ showForm, setShowForm, setSearchTerm }: Props) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" color="primary">
				<Toolbar>
					{!showForm && (
						<Button
							data-testid="add-record-btn"
							type="submit"
							variant="contained"
							size="medium"
							color="warning"
							onClick={() => {
								setShowForm(true);
							}}
						>
							Add New Record
						</Button>
					)}
					<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
						<></>
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} onChange={(e) => setSearchTerm(e.target.value)} />
					</Search>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
