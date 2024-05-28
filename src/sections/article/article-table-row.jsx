import { useState } from "react";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Iconify from "../../components/iconify";
import { useQuery } from "@tanstack/react-query";
import { exportXls, getArticleById } from "../../services/article.api";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";

// ----------------------------------------------------------------------

export default function ArticleTableRow({
    selected,
    id,
    title,
    url,
    handleDeleteArticle,
}) {
    const [open, setOpen] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const { data: articleInfo } = useQuery({
        queryKey: ["articleinfo", id],
        queryFn: () => getArticleById(id),
    });

    const { data: articleXls } = useQuery({
        queryKey: ["articlexls", id],
        queryFn: () => exportXls(id),
    });

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                        {id}
                    </Typography>
                </TableCell>

                <TableCell>{title}</TableCell>

                <TableCell>{url}</TableCell>

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
                        setDetailOpen(true);
                    }}
                >
                    <Iconify icon="lets-icons:view-alt-fill" sx={{ mr: 2 }} />
                    View
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        setOpen(null);

                        const dataStr = JSON.stringify(
                            articleXls?.data,
                            null,
                            2
                        );
                        const blob = new Blob([dataStr], {
                            type: "application/json",
                        });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = "data.json";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                >
                    <Iconify icon="material-symbols:download" sx={{ mr: 2 }} />
                    Export
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
                maxWidth="lg"
                open={detailOpen}
                onClose={() => {
                    setDetailOpen(false);
                }}
            >
                <DialogTitle>Detail Article</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Url"
                        name="url"
                        defaultValue={articleInfo?.data?.url}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{
                            margin: "8px 0px",
                        }}
                    />
                    <TextField
                        fullWidth
                        name="domain"
                        label="Domain"
                        margin="normal"
                        defaultValue={articleInfo?.data?.domain}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Keyword"
                        name="keyword"
                        margin="normal"
                        defaultValue={articleInfo?.data?.keyword?.map(
                            (data) => data.name
                        )}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Last Update"
                        name="lastUpdate"
                        margin="normal"
                        defaultValue={articleInfo?.data?.lastUpdate}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        name="content"
                        label="Content"
                        margin="normal"
                        value={articleInfo?.data?.content}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </DialogContent>
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
                    Delete Article
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this article?
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
                            handleDeleteArticle(id);
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

ArticleTableRow.propTypes = {
    avatarUrl: PropTypes.any,
    company: PropTypes.any,
    handleClick: PropTypes.func,
    isVerified: PropTypes.any,
    name: PropTypes.any,
    role: PropTypes.any,
    selected: PropTypes.any,
    status: PropTypes.string,
};
