import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import React from "react";

const SpiderDeleteModal = (props) => {
    return (
        <Dialog
            {...props}
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Delete Spider</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this spider?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        props.onClose();
                    }}
                    variant="outlined"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        props.onClose();
                        props.handleDeleteSpider(props.id);
                    }}
                    autoFocus
                    variant="contained"
                    color="error"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SpiderDeleteModal;
