import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";

import Swal from "sweetalert2";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Label from "../../components/label";
import Iconify from "../../components/iconify";
import SpiderDetailModal from "./spider-detail-modal";
import SpiderEditBasicModal from "./spider-edit-basic-modal";
import SpiderEditAdvanceModal from "./spider-edit-advance-modal";
import SpiderEditScheduleModal from "./spider-edit-schedule-modal";
import { useQuery } from "@tanstack/react-query";
import { getSpiderById } from "../../services/spider.api";
import {
    runSpiderById,
    stopSpiderById,
    deleteSpiderById,
} from "../../services/spider.api";

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
    handleClick,
}) {
    const [open, setOpen] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const { data } = useQuery({
        queryKey: ["spider", id],
        queryFn: () => getSpiderById(id),
    });

    const profile = JSON.parse(localStorage.getItem("profile"));

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const deleteSpider = async () => {
        const response = await deleteSpiderById(id);

        if (response.status == 200) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: "true",
            }).fire({
                icon: "success",
                title:
                    "\n\nDelete spider " +
                    id +
                    " successfully. Please refresh page.",
            });
        } else {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: "true",
            }).fire({
                icon: "error",
                title: "\n\nDelete failed",
            });
        }
    };

    const runSpider = async () => {
        const response = await runSpiderById(id, { user_id: profile.id });

        if (response.status == 200) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: "true",
            }).fire({
                icon: "success",
                title:
                    "\n\nRun spider " +
                    id +
                    " successfully. Please refresh page.",
            });
        } else {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: "true",
            }).fire({
                icon: "error",
                title: "\n\nRun failed",
            });
        }
    };

    const stopSpider = async () => {
        const response = await stopSpiderById(id);

        if (response.status == 200) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: "true",
            }).fire({
                icon: "success",
                title:
                    "\n\nStop spider " +
                    id +
                    " successfully. Please refresh page.",
            });
        } else {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: "true",
            }).fire({
                icon: "error",
                title: "\n\nStop failed",
            });
        }
    };

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
                    <IconButton onClick={handleOpenMenu}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                    sx: { width: 140 },
                }}
            >
                <MenuItem
                    onClick={
                        (status === "Available" && runSpider) ||
                        (status === "Running" && stopSpider)
                    }
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
                        setShowViewModal(true);
                        handleCloseMenu();
                    }}
                >
                    <Iconify icon="eva:alert-circle-outline" sx={{ mr: 2 }} />
                    See Detail
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        setShowEditModal(true);
                        handleCloseMenu();
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
                            setShowScheduleModal(true);
                            handleCloseMenu();
                        }}
                    >
                        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                        Schedule
                    </MenuItem>
                )}

                <MenuItem
                    onClick={() => {
                        deleteSpider();
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
            {/*<SpiderEditBasicModal
                open={showEditModal}
                article={data?.data || {}}
                onClose={() => setShowEditModal(false)}
                  />*/}
            <SpiderEditAdvanceModal
                open={showEditModal}
                article={data?.data || {}}
                onClose={() => setShowEditModal(false)}
            />
            <SpiderEditScheduleModal
                open={showScheduleModal}
                article={data?.data || {}}
                onClose={() => setShowScheduleModal(false)}
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
