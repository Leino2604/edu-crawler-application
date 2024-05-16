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

import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";

import { deleteFile, getFile } from "../../../services/file.api";

import TableNoData from "../table-no-data";
import TableEmptyRows from "../table-empty-rows";
import FileTableRow from "../file-table-row";
import FileTableHead from "../file-table-head";
import FileTableToolbar from "../file-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";

// ----------------------------------------------------------------------

export default function FilePage() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("asc");
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState("Id");
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const deleteMutation = useMutation({
        mutationFn: (body) => deleteFile(body),
    });

    const { data, refetch } = useQuery({
        queryKey: ["file", page, rowsPerPage],
        queryFn: () => getFile({ page: page, file_per_page: rowsPerPage }),
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

    const handleDeleteFile = (id) => {
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
                <Typography variant="h4">File</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                >
                    New File
                </Button>
            </Stack>

            <Card>
                <FileTableToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: "unset" }}>
                        <Table sx={{ minWidth: 800 }}>
                            <FileTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={data?.data?.total_file || 0}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: "id", label: "Id" },
                                    { id: "name", label: "Name" },
                                    {
                                        id: "originalAddress",
                                        label: "Original Address",
                                    },
                                    { id: "type", label: "Type" },
                                    { id: "" },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <FileTableRow
                                            key={row.id}
                                            id={row.id}
                                            name={row.name}
                                            originalAddress={
                                                row.originalAddress
                                            }
                                            type={row.type}
                                            selected={
                                                selected.indexOf(row.Id) !== -1
                                            }
                                            handleClick={(event) =>
                                                handleClick(event, row.Id)
                                            }
                                            handleDeleteFile={handleDeleteFile}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(
                                        page,
                                        rowsPerPage,
                                        data?.data?.total_file
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
                    count={data?.data?.total_file || 0}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}
