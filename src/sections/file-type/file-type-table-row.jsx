import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";

import Label from "../../components/label";
import Iconify from "../../components/iconify";

// ----------------------------------------------------------------------

export default function FileTypeTableRow({
    selected,
    id,
    type,
    handleClick,
    handleUpdateFileType,
    handleDeleteFileType,
}) {
    const [open, setOpen] = useState(null);
    const [types, setTypes] = useState(type);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox
                        disableRipple
                        checked={selected}
                        onChange={handleClick}
                    />
                </TableCell>

                <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                        {id}
                    </Typography>
                </TableCell>

                <TableCell>{type}</TableCell>

                <TableCell align="right">
                    <IconButton
                        onClick={(e) => {
                            setOpen(e.currentTarget);
                        }}
                    >
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={() => {
                    setOpen(false);
                }}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: { width: 140 },
                }}
            >
                <MenuItem
                    onClick={() => {
                        setOpen(null);
                        setUpdateOpen(true);
                    }}
                >
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        setOpen(null);
                        setDeleteOpen(true);
                    }}
                    sx={{ color: "error.main" }}
                >
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            <Dialog
                fullWidth
                open={updateOpen}
                onClose={() => {
                    setUpdateOpen(false);
                }}
                PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleUpdateFileType(id, types);
                        setUpdateOpen(false);
                    },
                }}
            >
                <DialogTitle>Update Type</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        defaultValue={type}
                        margin="dense"
                        id="type"
                        name="type"
                        label="Type"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => {
                            setTypes(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setUpdateOpen(false);
                            setTypes(type);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={deleteOpen}
                onClose={() => {
                    setDeleteOpen(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means
                        sending anonymous location data to Google, even when no
                        apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setDeleteOpen(false);
                        }}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleDeleteFileType(id);
                            setDeleteOpen(false);
                        }}
                        autoFocus
                        variant="contained"
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

FileTypeTableRow.propTypes = {
    avatarUrl: PropTypes.any,
    company: PropTypes.any,
    handleClick: PropTypes.func,
    isVerified: PropTypes.any,
    name: PropTypes.any,
    role: PropTypes.any,
    selected: PropTypes.any,
    status: PropTypes.string,
};
