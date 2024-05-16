import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
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
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";

import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";

import { emptyRows, applyFilter, getComparator } from "../utils";

import TableNoData from "../table-no-data";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import TableEmptyRows from "../table-empty-rows";
import UserTableToolbar from "../user-table-toolbar";

import { deleteUser, getUser } from "../../../services/user.api";

// ----------------------------------------------------------------------

export default function UserPage() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("asc");
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState("username");
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);

    const deleteMutation = useMutation({
        mutationFn: (body) => deleteUser(body),
    });

    const { data, refetch } = useQuery({
        queryKey: ["user", page, rowsPerPage],
        queryFn: () => getUser({ page: page, userPerPage: rowsPerPage }),
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === "asc";
        if (id !== "") {
            setOrder(isAsc ? "desc" : "asc");
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data?.data?.detail?.detail?.map(
                (n) => n.username
            );
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
        inputData: data?.data?.detail?.detail || [],
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    const handleDeleteUser = (id) => {
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
                <Typography variant="h4">User</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={handleClickOpen}
                >
                    New User
                </Button>
            </Stack>

            <Card>
                <UserTableToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: "unset" }}>
                        <Table sx={{ minWidth: 800 }}>
                            <UserTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={data?.data?.detail?.total || 0}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: "username", label: "Username" },
                                    { id: "role", label: "Role" },
                                    { id: "onlineStatus", label: "Online" },
                                    { id: "accountStatus", label: "Status" },
                                    { id: "" },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row) => (
                                        <UserTableRow
                                            key={row.id}
                                            id={row.id}
                                            username={row.username}
                                            role={row.role}
                                            accountStatus={row.accountStatus}
                                            onlineStatus={row.onlineStatus}
                                            selected={
                                                selected.indexOf(
                                                    row.username
                                                ) !== -1
                                            }
                                            handleClick={(event) =>
                                                handleClick(event, row.username)
                                            }
                                            handleDeleteUser={handleDeleteUser}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(
                                        page,
                                        rowsPerPage,
                                        data?.data?.detail?.total
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
                    count={data?.data?.detail?.total || 0}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email
                        address here. We will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Add
                    </Button>
                    <Button
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
