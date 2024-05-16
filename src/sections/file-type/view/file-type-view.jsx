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

import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";

import {
    createFileType,
    deleteFileType,
    getFileType,
    updateFileType,
} from "../../../services/filetype.api";

import TableNoData from "../table-no-data";
import TableEmptyRows from "../table-empty-rows";
import FileTypeTableRow from "../file-type-table-row";
import FileTypeTableHead from "../file-type-table-head";
import FileTypeTableToolbar from "../file-type-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";

// ----------------------------------------------------------------------

export default function FileTypePage() {
    const [page, setPage] = useState(0);
    const [types, setTypes] = useState("");
    const [order, setOrder] = useState("asc");
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState("Id");
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [createOpen, setCreateOpen] = useState(false);

    const createMutation = useMutation({
        mutationFn: (body) => createFileType(body),
    });
    const updateMutation = useMutation({
        mutationFn: (body) => updateFileType(body),
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

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data?.data?.detail?.map((n) => n.Id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
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

    const handleCreateFileType = (type) => {
        createMutation.mutate(type, {
            onSuccess: () => {
                refetch();
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };
    const handleUpdateFileType = (id, type) => {
        updateMutation.mutate(
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
                        setCreateOpen(true);
                    }}
                >
                    New File Type
                </Button>
            </Stack>

            <Card>
                {/* <FileTypeTableToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                /> */}

                <Scrollbar>
                    <TableContainer sx={{ overflow: "unset" }}>
                        <Table sx={{ minWidth: 800 }}>
                            <FileTypeTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={data?.data?.totalFileType || 0}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: "id", label: "Id" },
                                    { id: "type", label: "Type" },
                                    { id: "" },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <FileTypeTableRow
                                            key={row.id}
                                            id={row.id}
                                            type={row.type}
                                            selected={
                                                selected.indexOf(row.id) !== -1
                                            }
                                            handleClick={(event) =>
                                                handleClick(event, row.id)
                                            }
                                            handleUpdateFileType={
                                                handleUpdateFileType
                                            }
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
                    open={createOpen}
                    onClose={() => {
                        setCreateOpen(false);
                    }}
                    PaperProps={{
                        component: "form",
                        onSubmit: (event) => {
                            event.preventDefault();
                            handleCreateFileType(types);
                            setCreateOpen(false);
                            setTypes("");
                        },
                    }}
                >
                    <DialogTitle>Create Type</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            defaultValue={types}
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
                                setCreateOpen(false);
                                setTypes("");
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </Container>
    );
}
