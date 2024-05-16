import { useState } from "react";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
import EditModal from "./edit-modal";
import { useQuery } from "@tanstack/react-query";
import { exportXls, getArticleById } from "../../services/article.api";

// ----------------------------------------------------------------------

export default function ArticleTableRow({
    selected,
    id,
    title,
    url,
    handleClick,
}) {
    const [data, setData] = useState(null);
    const [open, setOpen] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const { data: articleInfo } = useQuery({
        queryKey: ["articleinfo", id],
        queryFn: () => getArticleById(id),
    });

    const { data: articleXls } = useQuery({
        queryKey: ["articlexls", id],
        queryFn: () => exportXls(id),
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
                        {id}
                    </Typography>
                </TableCell>

                <TableCell>{title}</TableCell>

                <TableCell>{url}</TableCell>

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
                    onClick={() => {
                        setShowEditModal(true);
                        handleCloseMenu();
                    }}
                >
                    <Iconify icon="lets-icons:view-alt-fill" sx={{ mr: 2 }} />
                    View
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        console.log(Object.keys(articleXls?.data));
                        console.log(Object.keys(articleXls?.data).splice(7, 8));
                        const workbook = XLSX.utils.book_new();

                        function processKeywords(keywords) {
                            let result = [];
                            keywords.forEach((keyword) => {
                                let keywordData = {
                                    id: keyword.id,
                                    name: keyword.name,
                                    articleAppearance:
                                        keyword.articleAppearance,
                                };
                                result.push(keywordData);
                                if (
                                    keyword.children &&
                                    keyword.children.length > 0
                                ) {
                                    keywordData.children = processKeywords(
                                        keyword.children
                                    );
                                }
                            });
                            return result;
                        }

                        const processedKeywords = processKeywords(
                            articleXls?.data.keyword
                        );

                        const exportData = [
                            ["Key", "Value"], // Headers
                            ["Title", articleXls?.data.title],
                            ["Domain", articleXls?.data.domain],
                            ["URL", articleXls?.data.url],
                            [
                                "First Crawl Date",
                                articleXls?.data.firstCrawlDate,
                            ],
                            ["Last Update", articleXls?.data.lastUpdate],
                            ["Content", articleXls?.data.content],
                            ["Keywords", JSON.stringify(processedKeywords)], // Convert keywords to string
                        ];

                        const sheet = XLSX.utils.aoa_to_sheet(exportData);

                        // Append the worksheet to the workbook
                        XLSX.utils.book_append_sheet(workbook, sheet, "Data");

                        // Generate Excel buffer
                        const excelBuffer = XLSX.write(workbook, {
                            bookType: "xlsx",
                            type: "buffer",
                        });

                        // Create a blob
                        const blob = new Blob([excelBuffer], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
                        });

                        // Save the blob as a file
                        saveAs(blob, "exportedData.xlsx");
                    }}
                >
                    <Iconify icon="material-symbols:download" sx={{ mr: 2 }} />
                    Export
                </MenuItem>
            </Popover>
            <EditModal
                open={showEditModal}
                article={articleInfo?.data || {}}
                onClose={() => setShowEditModal(false)}
            />
        </>
    );
}

ArticleTableRow.propTypes = {
    avatarUrl: PropTypes.any,
    company: PropTypes.any,
    handleClick: PropTypes.func,
    isVerified: PropTypes.any,
    name: PropTypes.any,
    role: PropTypes.any,
    selected: PropTypes.any,
    status: PropTypes.string,
};
