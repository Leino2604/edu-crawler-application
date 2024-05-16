import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function EditModal(prop) {
    const { title, content, url, domain } = prop.article;

    return (
        <Modal
            {...prop}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <form
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <TextField
                        label="Url"
                        name="url"
                        margin="normal"
                        defaultValue={url}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        name="domain"
                        label="Domain"
                        margin="normal"
                        defaultValue={domain}
                        InputProps={{
                            readOnly: true,
                        }}
                    />

                    <TextField
                        rows={15}
                        multiline
                        name="content"
                        label="Content"
                        margin="normal"
                        value={content}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </form>
            </Box>
        </Modal>
    );
}
