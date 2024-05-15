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
    const { title, content, url, domain, keyword, lastUpdate } = prop.article;

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
                        disabled
                    />
                    <TextField
                        label="Domain"
                        name="domain"
                        margin="normal"
                        defaultValue={domain}
                        disabled
                    />

                    <TextField
                        label="Keyword"
                        name="keyword"
                        margin="normal"
                        defaultValue={keyword?.map(data => data.name)}
                        disabled
                    />

                    <TextField
                        label="Last Update"
                        name="lastUpdate"
                        margin="normal"
                        defaultValue={lastUpdate}
                        disabled
                    />

                    <textarea
                        style={{ flexGrow: 1, width: "100%" }}
                        name="content"
                        value={content}
                        type="password"
                        margin="normal"
                    />
                </form>
            </Box>
        </Modal>
    );
}
