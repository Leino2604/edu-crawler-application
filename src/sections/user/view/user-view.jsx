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
    DialogContentText,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";

import TableNoData from "../table-no-data";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import TableEmptyRows from "../table-empty-rows";
import { emptyRows, applyFilter, getComparator } from "../utils";

import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import {
    getUser,
    addUser,
    editUser,
    deleteUser,
} from "../../../services/user.api";

// ----------------------------------------------------------------------

export default function UserPage() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [addOpen, setAddOpen] = useState(false);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const addMutation = useMutation({
        mutationFn: (body) => addUser(body),
    });
    const editMutation = useMutation({
        mutationFn: (body) => editUser(body),
    });
    const deleteMutation = useMutation({
        mutationFn: (body) => deleteUser(body),
    });

    const { data, refetch } = useQuery({
        queryKey: ["user", page, rowsPerPage],
        queryFn: () => getUser({ page: page, userPerPage: rowsPerPage }),
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
        inputData: data?.data?.detail?.detail || [],
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    const handleAddUser = (body) => {
        addMutation.mutate(body, {
            onSuccess: () => {
                refetch();
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };
    const handleEditUser = (body) => {
        editMutation.mutate(body, {
            onSuccess: () => {
                refetch();
            },
        });
    };
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
                    onClick={() => {
                        setAddOpen(true);
                    }}
                >
                    New User
                </Button>
            </Stack>

            <Card>
                <Scrollbar>
                    <TableContainer sx={{ overflow: "unset" }}>
                        <Table sx={{ minWidth: 800 }}>
                            <UserTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleSort}
                                headLabel={[
                                    { id: "id", label: "Id" },
                                    { id: "username", label: "Username" },
                                    { id: "role", label: "Role" },
                                    { id: "accountStatus", label: "Status" },
                                    { id: "" },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered.map((row) => (
                                    <UserTableRow
                                        key={row.id}
                                        id={row.id}
                                        username={row.username}
                                        role={row.role}
                                        accountStatus={row.accountStatus}
                                        handleEditUser={handleEditUser}
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
                            handleAddUser({
                                FullName: fullname,
                                Mail: email,
                                Username: username,
                                Password: password,
                                Phone: phone,
                                RoleID: 2,
                                Role: "Free",
                            });
                            setAddOpen(false);
                            setFullname("");
                            setPhone("");
                            setEmail("");
                            setUsername("");
                            setPassword("");
                        },
                    }}
                >
                    <DialogTitle>Add User</DialogTitle>
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
                        <TextField
                            required
                            fullWidth
                            type="text"
                            id="username"
                            name="username"
                            label="Username"
                            value={username}
                            margin="normal"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                        <TextField
                            required
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            label="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            edge="end"
                                        >
                                            <Iconify
                                                icon={
                                                    showPassword
                                                        ? "eva:eye-fill"
                                                        : "eva:eye-off-fill"
                                                }
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setAddOpen(false);
                                setFullname("");
                                setPhone("");
                                setEmail("");
                                setUsername("");
                                setPassword("");
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
