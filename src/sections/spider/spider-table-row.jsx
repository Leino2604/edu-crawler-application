import { useState } from "react";
import PropTypes from "prop-types";

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
import { useQuery } from "@tanstack/react-query";
import { getSpiderById } from "../../services/spider.api";

// ----------------------------------------------------------------------

export default function SpiderTableRow({
    selected,
    id,
    url,
    crawlStatus,
    lastRunDate,
    status,
    handleClick,
}) {
    const [open, setOpen] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { data } = useQuery({
        queryKey: ["spider", id],
        queryFn: () => getSpiderById(id),
    });

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox
                        disableRipple
                        checked={selected}
                        onChange={handleClick}
                    />
                </TableCell>

                <TableCell component="th" scope="row">
                    <Typography variant="subtitle2" noWrap>
                        {`Spider ${id}`}
                    </Typography>
                </TableCell>

                <TableCell>{url}</TableCell>

                <TableCell>{lastRunDate}</TableCell>

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
                    onClick={handleCloseMenu}
                    sx={{ 
                      color: (status === "Available" && "success.main") || (status === "Running" && "error.main")
                    }}
                >
                    <Iconify 
                      icon={(status === "Available" && "eva:arrow-right-outline")  || (status === "Running" && "eva:stop-circle-outline")}
                      sx={{ mr: 2 }} 
                    />
                    {
                      (status === "Available" && "Run") ||(status === "Running" && "Stop")
                    }
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

                <MenuItem onClick={handleCloseMenu}>
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem
                    onClick={handleCloseMenu}
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
