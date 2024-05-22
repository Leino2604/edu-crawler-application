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

import Label from "../../components/label";
import Iconify from "../../components/iconify";

// ----------------------------------------------------------------------

export default function UserTableRow({
    id,
    username,
    role,
    accountStatus,
    handleEditUser,
    handleDeleteUser,
}) {
    const [open, setOpen] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox">
                <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                        {id}
                    </Typography>
                </TableCell>

                <TableCell component="th" scope="row">
                    {username}
                </TableCell>

                <TableCell>{role}</TableCell>

                <TableCell>
                    <Label
                        color={
                            (accountStatus === "Restrict" && "error") ||
                            "success"
                        }
                    >
                        {accountStatus}
                    </Label>
                </TableCell>

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
                open={editOpen}
                onClose={() => {
                    setEditOpen(false);
                }}
                PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleEditUser({
                            user_id: id,
                            full_name: fullname,
                            mail: email,
                            phone: phone,
                        });
                        setEditOpen(false);
                        setFullname("");
                        setPhone("");
                        setEmail("");
                    },
                }}
            >
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        type="text"
                        id="fullname"
                        name="fullname"
                        label="Full Name"
                        value={fullname}
                        sx={{ margin: "8px 0px" }}
                        onChange={(e) => {
                            setFullname(e.target.value);
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        type="text"
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={phone}
                        margin="normal"
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        value={email}
                        margin="normal"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setEditOpen(false);
                            setFullname("");
                            setPhone("");
                            setEmail("");
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
                <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this user?
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
                            handleDeleteUser(id);
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

UserTableRow.propTypes = {
    avatarUrl: PropTypes.any,
    company: PropTypes.any,
    handleClick: PropTypes.func,
    isVerified: PropTypes.any,
    name: PropTypes.any,
    role: PropTypes.any,
    selected: PropTypes.any,
    status: PropTypes.string,
};
