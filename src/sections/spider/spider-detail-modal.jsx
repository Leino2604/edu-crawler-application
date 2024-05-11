import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from '@mui/base/Input';
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

export default function SpiderDetailModal(prop) {
    const { Id, Type, Url, Status, Delay, GraphDeep, MaxThread} = prop.article;

    return (
        <Modal
            {...prop}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Spider {Id}
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
                        defaultValue={Url}
                        disabled={true}
                    />
                    <TextField
                        label="Type"
                        name="type"
                        margin="normal"
                        defaultValue={Type}
                        disabled={true}
                    />
                    <TextField
                        label="Status"
                        name="status"
                        margin="normal"
                        defaultValue={Status}
                        disabled={true}
                    />
                    <TextField
                        label="Delay"
                        name="delay"
                        margin="normal"
                        defaultValue={Delay}
                        disabled={true}
                    />
                    <TextField
                        label="Graph Depth"
                        name="graphDeep"
                        margin="normal"
                        defaultValue={GraphDeep}
                        disabled={true}
                    />
                    <TextField
                        label="Max Thread"
                        name="maxThread"
                        margin="normal"
                        defaultValue={MaxThread}
                        disabled={true}
                    />
                </form>
            </Box>
        </Modal>
    );
}
