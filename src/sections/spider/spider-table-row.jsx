import { useState } from "react";
import PropTypes from "prop-types";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import SpiderDeleteModal from "./spider-delete-modal";

import Label from "../../components/label";
import Iconify from "../../components/iconify";
import SpiderDetailModal from "./spider-detail-modal";
import SpiderEditModal from "./spider-edit-modal";
import SpiderScheduleModal from "./spider-schedule-modal";
import { useQuery } from "@tanstack/react-query";
import { getSpiderById } from "../../services/spider.api";

// ----------------------------------------------------------------------

export default function SpiderTableRow({
    selected,
    id,
    url,
    crawlStatus,
    lastRunDate,
    lastRunNewArticle,
    lastRunUpdateArticle,
    status,
    handleScheduleSpider,
    handleRunSpider,
    handleStopSpider,
    handleDeleteSpider,
    refetchRow,
}) {
    const [open, setOpen] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [scheduleOpen, setScheduleOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const profile = JSON.parse(localStorage.getItem("profile"));

    const { data, refetch } = useQuery({
        queryKey: ["spider", id],
        queryFn: () => getSpiderById(id),
    });

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                        {`Spider ${id}`}
                    </Typography>
                </TableCell>

                <TableCell>{url}</TableCell>

                <TableCell>
                    {lastRunDate ? lastRunDate : "Hasn't been launched"}
                </TableCell>

                <TableCell>{lastRunNewArticle}</TableCell>

                <TableCell>{lastRunUpdateArticle}</TableCell>

                <TableCell>
                    <Label
                        color={
                            (status === "Available" && "success") ||
                            (status === "Running" && "info")
                        }
                    >
                        {status}
                    </Label>
                </TableCell>

                <TableCell align="right">
                    <IconButton
                        onClick={(event) => {
                            setOpen(event.currentTarget);
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
                        setShowViewModal(true);
                    }}
                >
                    <Iconify icon="eva:alert-circle-outline" sx={{ mr: 2 }} />
                    See Detail
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        setOpen(null);
                        setShowEditModal(true);
                    }}
                >
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                {(profile.Role == "Admin" ||
                    profile.Role == "Pro" ||
                    profile.Role == "Standard") && (
                    <MenuItem
                        onClick={() => {
                            setOpen(null);
                            setScheduleOpen(true);
                        }}
                    >
                        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                        Schedule
                    </MenuItem>
                )}

                <MenuItem
                    onClick={() => {
                        setOpen(null);
                        (status === "Available" && handleRunSpider(id)) ||
                            (status === "Running" && handleStopSpider(id));
                    }}
                    sx={{
                        color:
                            (status === "Available" && "success.main") ||
                            (status === "Running" && "error.main"),
                    }}
                >
                    <Iconify
                        icon={
                            (status === "Available" &&
                                "eva:arrow-right-outline") ||
                            (status === "Running" && "eva:stop-circle-outline")
                        }
                        sx={{ mr: 2 }}
                    />
                    {(status === "Available" && "Run") ||
                        (status === "Running" && "Stop")}
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
            <SpiderDetailModal
                open={showViewModal}
                article={data?.data || {}}
                onClose={() => setShowViewModal(false)}
            />
            <SpiderEditModal
                open={showEditModal}
                article={data?.data || {}}
                onClose={() => setShowEditModal(false)}
                refetch={refetch}
                refetchRow={refetchRow}
            />
            <SpiderScheduleModal
                open={scheduleOpen}
                article={data?.data || {}}
                handleScheduleSpider={handleScheduleSpider}
                refetch={refetch}
                onClose={() => setScheduleOpen(false)}
            />
            <SpiderDeleteModal
                open={deleteOpen}
                id={id}
                handleDeleteSpider={handleDeleteSpider}
                onClose={() => setDeleteOpen(false)}
            />
        </>
    );
}

SpiderTableRow.propTypes = {
    avatarUrl: PropTypes.any,
    company: PropTypes.any,
    handleClick: PropTypes.func,
    isVerified: PropTypes.any,
    name: PropTypes.any,
    role: PropTypes.any,
    selected: PropTypes.any,
    status: PropTypes.string,
};
