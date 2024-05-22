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
import KeywordTableRow from "../keyword-table-row";
import KeywordTableHead from "../keyword-table-head";
import { emptyRows, applyFilter, getComparator } from "../utils";

import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import {
    getKeyword,
    addKeyword,
    editKeyword,
    deleteKeyword,
} from "../../../services/keyword.api";

// ----------------------------------------------------------------------

export default function KeywordPage() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("asc");
    const [keywords, setKeywords] = useState("");
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState("id");
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [addOpen, setAddOpen] = useState(false);

    const addMutation = useMutation({
        mutationFn: (body) => addKeyword(body),
    });
    const editMutation = useMutation({
        mutationFn: (body) => editKeyword(body),
    });
    const deleteMutation = useMutation({
        mutationFn: (body) => deleteKeyword(body),
    });

    const { data, refetch } = useQuery({
        queryKey: ["keyword", page, rowsPerPage],
        queryFn: () => getKeyword({ page: page, keywordPerPage: rowsPerPage }),
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

    const handleAddKeyword = (keyword) => {
        addMutation.mutate(keyword, {
            onSuccess: () => {
                refetch();
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };
    const handleEditKeyword = (id, keyword) => {
        editMutation.mutate(
            { id, keyword },
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
    const handleDeleteKeyword = (id) => {
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
                <Typography variant="h4">Keyword</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => {
                        setAddOpen(true);
                    }}
                >
                    New Keyword
                </Button>
            </Stack>

            <Card>
                <Scrollbar>
                    <TableContainer sx={{ overflow: "unset" }}>
                        <Table sx={{ minWidth: 800 }}>
                            <KeywordTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleSort}
                                headLabel={[
                                    { id: "id", label: "Id" },
                                    { id: "name", label: "Name" },
                                    {
                                        id: "articleAppearance",
                                        label: "Article Appearance",
                                    },
                                    { id: "" },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered.map((row) => (
                                    <KeywordTableRow
                                        key={row.id}
                                        id={row.id}
                                        name={row.name}
                                        articleAppearance={
                                            row.articleAppearance
                                        }
                                        handleClick={(event) =>
                                            handleClick(event, row.id)
                                        }
                                        handleEditKeyword={handleEditKeyword}
                                        handleDeleteKeyword={
                                            handleDeleteKeyword
                                        }
                                    />
                                ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(
                                        page,
                                        rowsPerPage,
                                        data?.data?.totalKeyword
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
                    count={data?.data?.totalKeyword || 0}
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
                            handleAddKeyword(keywords);
                            setAddOpen(false);
                            setKeywords("");
                        },
                    }}
                >
                    <DialogTitle>Add Keyword</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            defaultValue={keywords}
                            id="keyword"
                            name="keyword"
                            label="Keyword"
                            fullWidth
                            onChange={(e) => {
                                setKeywords(e.target.value);
                            }}
                            sx={{ margin: "8px 0px" }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setAddOpen(false);
                                setKeywords("");
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
