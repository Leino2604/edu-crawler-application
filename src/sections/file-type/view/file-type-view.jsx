import { useState } from "react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

import TableNoData from "../table-no-data";
import TableEmptyRows from "../table-empty-rows";
import FileTypeTableRow from "../file-type-table-row";
import FileTypeTableHead from "../file-type-table-head";
import { emptyRows, applyFilter, getComparator } from "../utils";

import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import {
    addFileType,
    deleteFileType,
    getFileType,
    editFileType,
} from "../../../services/filetype.api";

// ----------------------------------------------------------------------

export default function FileTypePage() {
    const [page, setPage] = useState(0);
    const [types, setTypes] = useState("");
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [addOpen, setAddOpen] = useState(false);

    const addMutation = useMutation({
        mutationFn: (body) => addFileType(body),
    });
    const editMutation = useMutation({
        mutationFn: (body) => editFileType(body),
    });
    const deleteMutation = useMutation({
        mutationFn: (body) => deleteFileType(body),
    });

    const { data, refetch } = useQuery({
        queryKey: ["type", page, rowsPerPage],
        queryFn: () =>
            getFileType({ page: page, filetypePerPage: rowsPerPage }),
        placeholderData: keepPreviousData,
    });

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === "asc";
        if (id !== "") {
            setOrder(isAsc ? "desc" : "asc");
            setOrderBy(id);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const dataFiltered = applyFilter({
        inputData: data?.data?.detail || [],
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    const handleAddFileType = (type) => {
        addMutation.mutate(type, {
            onSuccess: () => {
                refetch();
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };
    const handleEditFileType = (id, type) => {
        editMutation.mutate(
            { id, type },
            {
                onSuccess: () => {
                    refetch();
                },
                onError: (err) => {
                    console.log(err);
                },
            }
        );
    };
    const handleDeleteFileType = (id) => {
        deleteMutation.mutate(id, {
            onSuccess: () => {
                refetch();
            },
        });
    };

    return (
        <Container>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
            >
                <Typography variant="h4">File Type</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => {
                        setAddOpen(true);
                    }}
                >
                    New File Type
                </Button>
            </Stack>

            <Card>
                <Scrollbar>
                    <TableContainer sx={{ overflow: "unset" }}>
                        <Table sx={{ minWidth: 800 }}>
                            <FileTypeTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleSort}
                                headLabel={[
                                    { id: "id", label: "Id" },
                                    { id: "type", label: "Type" },
                                    { id: "" },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered.map((row) => (
                                    <FileTypeTableRow
                                        key={row.id}
                                        id={row.id}
                                        type={row.type}
                                        handleEditFileType={handleEditFileType}
                                        handleDeleteFileType={
                                            handleDeleteFileType
                                        }
                                    />
                                ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(
                                        page,
                                        rowsPerPage,
                                        data?.data?.totalFileType
                                    )}
                                />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={data?.data?.totalFileType || 0}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Dialog
                    fullWidth
                    open={addOpen}
                    onClose={() => {
                        setAddOpen(false);
                    }}
                    PaperProps={{
                        component: "form",
                        onSubmit: (event) => {
                            event.preventDefault();
                            handleAddFileType(types);
                            setAddOpen(false);
                            setTypes("");
                        },
                    }}
                >
                    <DialogTitle>Add File Type</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            defaultValue={types}
                            id="type"
                            name="type"
                            label="Type"
                            fullWidth
                            onChange={(e) => {
                                setTypes(e.target.value);
                            }}
                            sx={{ margin: "8px 0px" }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setAddOpen(false);
                                setTypes("");
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
            </Card>
        </Container>
    );
}
