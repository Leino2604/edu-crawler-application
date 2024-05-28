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

import TableNoData from "../table-no-data";
import TableEmptyRows from "../table-empty-rows";
import SpiderTableRow from "../spider-table-row";
import SpiderTableHead from "../spider-table-head";
import SpiderAddModal from "../spider-add-modal";
import { emptyRows, applyFilter, getComparator } from "../utils";

import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import {
    deleteSpider,
    getSpider,
    runSpider,
    scheduleSpider,
    stopSpider,
} from "../../../services/spider.api";
import { getSpiderByUserId } from "../../../services/user.api";

// ----------------------------------------------------------------------

export default function SpiderPage() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("Id");
    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showCreateSpiderModal, setShowCreateSpiderModal] = useState(false);
    const result = localStorage.getItem("profile")
        ? JSON.parse(localStorage.getItem("profile"))
        : null;

    const scheduleMutation = useMutation({
        mutationFn: (body) => scheduleSpider(body),
    });
    const runMutation = useMutation({
        mutationFn: (body) => runSpider(body),
    });
    const stopMutation = useMutation({
        mutationFn: (body) => stopSpider(body),
    });
    const deleteMutation = useMutation({
        mutationFn: (body) => deleteSpider(body),
    });

    const { data, refetch } = useQuery({
        queryKey: ["spider", page, rowsPerPage],
        queryFn: () => {
            return result?.Role == "Admin"
                ? getSpider({ page: page, spider_per_page: rowsPerPage })
                : getSpiderByUserId({
                      id: result.id,
                      page: page,
                      spider_per_page: rowsPerPage,
                  });
        },
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

    const handleScheduleSpider = (body) => {
        scheduleMutation.mutate(body, {
            onSuccess: (data) => {
                console.log(data);
                refetch();
            },
        });
    };
    const handleRunSpider = (body) => {
        runMutation.mutate(
            { id: body, userId: result.id },
            {
                onSuccess: () => {
                    refetch();
                },
            }
        );
    };
    const handleStopSpider = (body) => {
        stopMutation.mutate(body, {
            onSuccess: () => {
                refetch();
            },
        });
    };
    const handleDeleteSpider = (id) => {
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
                <Typography variant="h4">Spider</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => setShowCreateSpiderModal(true)}
                >
                    New Spider
                </Button>
            </Stack>

            <Card>
                <Scrollbar>
                    <TableContainer sx={{ overflow: "unset" }}>
                        <Table sx={{ minWidth: 800 }}>
                            <SpiderTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleSort}
                                headLabel={[
                                    { id: "Id", label: "Name" },
                                    { id: "Url", label: "Url" },
                                    {
                                        id: "Last Run Date",
                                        label: "Last Run Date",
                                    },
                                    {
                                        id: "Last Run New Article",
                                        label: "Last Run New Article",
                                    },
                                    {
                                        id: "Last Run Updated Article",
                                        label: "Last Run Updated Article",
                                    },
                                    { id: "Status", label: "Status" },
                                    { id: "" },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered.map((row) => (
                                    <SpiderTableRow
                                        key={row.Id}
                                        id={row.Id}
                                        url={row.Url}
                                        status={row.Status}
                                        crawlStatus={row.CrawlStatus}
                                        lastRunDate={row.LastRunDate}
                                        lastRunNewArticle={
                                            row.LastRunNewArticle
                                        }
                                        lastRunUpdateArticle={
                                            row.LastRunUpdateArticle
                                        }
                                        handleScheduleSpider={
                                            handleScheduleSpider
                                        }
                                        handleRunSpider={handleRunSpider}
                                        handleStopSpider={handleStopSpider}
                                        handleDeleteSpider={handleDeleteSpider}
                                        refetchRow={refetch}
                                    />
                                ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(
                                        page,
                                        rowsPerPage,
                                        data?.data?.total_spider
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
                    count={data?.data?.total_spider || 0}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
            <SpiderAddModal
                open={showCreateSpiderModal}
                onClose={() => setShowCreateSpiderModal(false)}
                refetchRow={refetch}
            />
        </Container>
    );
}
