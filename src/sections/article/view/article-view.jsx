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

import {
    deleteArticle,
    exportAllXls,
    getArticle,
} from "../../../services/article.api";

import TableNoData from "../table-no-data";
import TableEmptyRows from "../table-empty-rows";
import ArticleTableRow from "../article-table-row";
import ArticleTableHead from "../article-table-head";
import ArticleTableToolbar from "../article-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";
import { getArticleByUserId } from "../../../services/user.api";

// ----------------------------------------------------------------------

export default function ArticlePage() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("asc");
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState("id");
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const result = localStorage.getItem("profile")
        ? JSON.parse(localStorage.getItem("profile"))
        : null;

    const deleteMutation = useMutation({
        mutationFn: (body) => deleteArticle(body),
    });

    const { data: articles, refetch } = useQuery({
        queryKey: ["article", page, rowsPerPage],
        queryFn: () => {
            return result.Role == "Admin"
                ? getArticle({ page: page, articlePerPage: rowsPerPage })
                : getArticleByUserId({
                      id: result?.id,
                      page: page,
                      articlePerPage: rowsPerPage,
                  });
        },
        placeholderData: keepPreviousData,
    });

    const { data: articleXls } = useQuery({
        queryKey: ["allarticlexls"],
        queryFn: () => exportAllXls({ page: 0, articlePerPage: 20 }),
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
            const newSelecteds = articles?.data?.detail?.map((n) => n.id);
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
        inputData: articles?.data?.detail || [],
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    const handleDeleteArticle = (id) => {
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
                <Typography variant="h4">Article</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="material-symbols:download" />}
                    onClick={() => {
                        console.log(articleXls?.data);
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
                    Export All Article
                </Button>
            </Stack>

            <Card>
                <Scrollbar>
                    <TableContainer sx={{ overflow: "unset" }}>
                        <Table sx={{ minWidth: 800 }}>
                            <ArticleTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={articles?.data?.total_article || 0}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: "id", label: "Id" },
                                    { id: "title", label: "Title" },
                                    { id: "url", label: "Url" },
                                    { id: "" },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered.map((row) => (
                                    <ArticleTableRow
                                        key={row.id}
                                        id={row.id}
                                        title={row.title}
                                        url={row.url}
                                        selected={
                                            selected.indexOf(row.id) !== -1
                                        }
                                        handleClick={(event) =>
                                            handleClick(event, row.id)
                                        }
                                        handleDeleteArticle={
                                            handleDeleteArticle
                                        }
                                    />
                                ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(
                                        page,
                                        rowsPerPage,
                                        articles?.data?.total_article
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
                    count={articles?.data?.total_article || 0}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}
