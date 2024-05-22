import { useState } from "react";
import PropTypes from "prop-types";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
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

import Iconify from "../../components/iconify";

// ----------------------------------------------------------------------

export default function KeywordTableRow({
    selected,
    id,
    name,
    articleAppearance,
    handleEditKeyword,
    handleDeleteKeyword,
}) {
    const [open, setOpen] = useState(null);
    const [keywords, setKeywords] = useState(name);
    const [editOpden, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                        {id}
                    </Typography>
                </TableCell>

                <TableCell>{name}</TableCell>

                <TableCell>{articleAppearance}</TableCell>

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
                    setOpen(null);
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
                        setEditOpen(true);
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
                open={editOpden}
                onClose={() => {
                    setEditOpen(false);
                }}
                PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleEditKeyword(id, keywords);
                        setEditOpen(false);
                    },
                }}
            >
                <DialogTitle>Edit Keyword</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        defaultValue={name}
                        id="keyword"
                        name="keyword"
                        label="Keyword"
                        fullWidth
                        onChange={(e) => {
                            setKeywords(e.target.value);
                        }}
                        sx={{ margin: "8px 0px" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setEditOpen(false);
                            setKeywords(name);
                        }}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth
                open={deleteOpen}
                onClose={() => {
                    setDeleteOpen(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete Keyword
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this keyword?
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
                            setDeleteOpen(false);
                            handleDeleteKeyword(id);
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

KeywordTableRow.propTypes = {
    avatarUrl: PropTypes.any,
    company: PropTypes.any,
    handleClick: PropTypes.func,
    isVerified: PropTypes.any,
    name: PropTypes.any,
    role: PropTypes.any,
    selected: PropTypes.any,
    status: PropTypes.string,
};
