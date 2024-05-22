import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/base/Input";
import { Unstable_Grid as Grid } from "@mui/system";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Iconify from "../../components/iconify";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getKeyword } from "../../services/keyword.api";
import { getFileType } from "../../services/filetype.api";

import { useQuery } from "@tanstack/react-query";
import {
    updateSpiderBasicSettingById,
    updateSpiderUrlById,
    createWebpageSpider,
    createWebsiteSpider,
} from "../../services/spider.api";
import Swal from "sweetalert2";
import Chip from "@mui/material/Chip";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "75%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function WebsiteCrawlRulesField({ spiderData, setSpiderData }) {
    const updateTag = (subfolderID, id, tag) => {
        spiderData.subfolders[subfolderID].crawlRules[id].tag = tag;
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const updateHTMLClassName = (subfolderID, id, HTMLClassName) => {
        spiderData.subfolders[subfolderID].crawlRules[id].HTMLClassName =
            HTMLClassName;
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const updateHTMLIDName = (subfolderID, id, HTMLIDName) => {
        spiderData.subfolders[subfolderID].crawlRules[id].HTMLIDName =
            HTMLIDName;
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const updateSearchRuleTag = (subfolderID, id, tag) => {
        spiderData.subfolders[subfolderID].searchRules[id].tag = tag;
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const updateSearchRuleHTMLClassName = (subfolderID, id, HTMLClassName) => {
        spiderData.subfolders[subfolderID].searchRules[id].HTMLClassName =
            HTMLClassName;
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const updateSearchRuleHTMLIDName = (subfolderID, id, HTMLIDName) => {
        spiderData.subfolders[subfolderID].searchRules[id].HTMLIDName =
            HTMLIDName;
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const updateUrl = (subfolderID, url) => {
        spiderData.subfolders[subfolderID].url = url;
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const addSubfolder = () => {
        spiderData.subfolders.push({
            url: "",
            crawlRules: [
                {
                    tag: "p",
                    HTMLClassName: "",
                    HTMLIDName: "",
                },
            ],
            searchRules: [
                {
                    tag: "p",
                    HTMLClassName: "",
                    HTMLIDName: "",
                },
            ],
        });
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const removeSubfolder = (id) => {
        spiderData.subfolders.splice(id, 1);
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const addCrawlRules = (subfolderID) => {
        spiderData.subfolders[subfolderID].crawlRules.push({
            tag: "p",
            HTMLClassName: "",
            HTMLIDName: "",
        });
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const removeCrawlRules = (subfolderID, id) => {
        spiderData.subfolders[subfolderID].crawlRules.splice(id, 1);
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const addSearchRules = (subfolderID) => {
        spiderData.subfolders[subfolderID].searchRules.push({
            tag: "p",
            HTMLClassName: "",
            HTMLIDName: "",
        });
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const removeSearchRules = (subfolderID, id) => {
        spiderData.subfolders[subfolderID].searchRules.splice(id, 1);
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    return (
        <Grid container spacing={0} sx={{ flexGrow: 0 }}>
            <Grid xs={2}>
                <Typography id="modal-modal-title" variant="h4" component="h6">
                    Subfolder
                </Typography>
            </Grid>
            <Grid xs={10}>
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-circle-outline" />}
                    onClick={() => addSubfolder()}
                >
                    Add
                </Button>
            </Grid>
            {spiderData.subfolders.map((subFolder, index) => (
                <Grid container spacing={0} sx={{ flexGrow: 0 }}>
                    <Grid xs={2}>
                        <Typography
                            id="modal-modal-title"
                            variant="h5"
                            component="h2"
                        >
                            Subfolder {index + 1}
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Button
                            variant="contained"
                            color="inherit"
                            startIcon={<Iconify icon="eva:close-fill" />}
                            onClick={() => removeSubfolder(index)}
                        >
                            Remove
                        </Button>
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            label={"Url"}
                            name={"Url"}
                            margin="Url"
                            defaultValue={subFolder.url}
                            value={subFolder.url}
                            onChange={(e) => updateUrl(index, e.target.value)}
                        />
                    </Grid>
                    <Grid xs={10}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Crawl Rules
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Button
                            variant="contained"
                            color="inherit"
                            startIcon={
                                <Iconify icon="eva:plus-circle-outline" />
                            }
                            onClick={() => addCrawlRules(index)}
                        >
                            Add
                        </Button>
                    </Grid>
                    {subFolder.crawlRules.map(
                        (crawlRulesData, crawlRuleIndex) => (
                            <Grid container spacing={0} sx={{ flexGrow: 0 }}>
                                <Grid xs={6}>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                    >
                                        Crawl Rule {crawlRuleIndex + 1}
                                    </Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        startIcon={
                                            <Iconify icon="eva:close-fill" />
                                        }
                                        onClick={() =>
                                            removeCrawlRules(
                                                index,
                                                crawlRuleIndex
                                            )
                                        }
                                    ></Button>
                                </Grid>
                                <Grid xs={4}>
                                    <TextField
                                        label={"Tag " + (crawlRuleIndex + 1)}
                                        name={"Tag " + (crawlRuleIndex + 1)}
                                        margin="normal"
                                        defaultValue={crawlRulesData.tag}
                                        value={crawlRulesData.tag}
                                        onChange={(e) =>
                                            updateTag(
                                                index,
                                                crawlRuleIndex,
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid xs={4}>
                                    <TextField
                                        label={
                                            "HTMLClassName " +
                                            (crawlRuleIndex + 1)
                                        }
                                        name={
                                            "HTMLClassName " +
                                            (crawlRuleIndex + 1)
                                        }
                                        margin="normal"
                                        defaultValue={
                                            crawlRulesData.HTMLClassName
                                        }
                                        value={crawlRulesData.HTMLClassName}
                                        onChange={(e) =>
                                            updateHTMLClassName(
                                                index,
                                                crawlRuleIndex,
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid xs={4}>
                                    <TextField
                                        label={
                                            "HTMLIDName " + (crawlRuleIndex + 1)
                                        }
                                        name={
                                            "HTMLIDName " + (crawlRuleIndex + 1)
                                        }
                                        margin="normal"
                                        defaultValue={crawlRulesData.HTMLIDName}
                                        value={crawlRulesData.HTMLIDName}
                                        onChange={(e) =>
                                            updateHTMLIDName(
                                                index,
                                                crawlRuleIndex,
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                            </Grid>
                        )
                    )}
                    <Grid xs={10}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Search Rules
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Button
                            variant="contained"
                            color="inherit"
                            startIcon={
                                <Iconify icon="eva:plus-circle-outline" />
                            }
                            onClick={() => addSearchRules(index)}
                        >
                            Add
                        </Button>
                    </Grid>
                    {subFolder.searchRules.map(
                        (crawlRulesData, crawlRuleIndex) => (
                            <Grid container spacing={0} sx={{ flexGrow: 0 }}>
                                <Grid xs={6}>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                    >
                                        Search Rule {crawlRuleIndex + 1}
                                    </Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        startIcon={
                                            <Iconify icon="eva:close-fill" />
                                        }
                                        onClick={() =>
                                            removeSearchRules(
                                                index,
                                                crawlRuleIndex
                                            )
                                        }
                                    ></Button>
                                </Grid>
                                <Grid xs={4}>
                                    <TextField
                                        label={"Tag " + (crawlRuleIndex + 1)}
                                        name={"Tag " + (crawlRuleIndex + 1)}
                                        margin="normal"
                                        defaultValue={crawlRulesData.tag}
                                        value={crawlRulesData.tag}
                                        onChange={(e) =>
                                            updateSearchRuleTag(
                                                index,
                                                crawlRuleIndex,
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid xs={4}>
                                    <TextField
                                        label={
                                            "HTMLClassName " +
                                            (crawlRuleIndex + 1)
                                        }
                                        name={
                                            "HTMLClassName " +
                                            (crawlRuleIndex + 1)
                                        }
                                        margin="normal"
                                        defaultValue={
                                            crawlRulesData.HTMLClassName
                                        }
                                        value={crawlRulesData.HTMLClassName}
                                        onChange={(e) =>
                                            updateSearchRuleHTMLClassName(
                                                index,
                                                crawlRuleIndex,
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid xs={4}>
                                    <TextField
                                        label={
                                            "HTMLIDName " + (crawlRuleIndex + 1)
                                        }
                                        name={
                                            "HTMLIDName " + (crawlRuleIndex + 1)
                                        }
                                        margin="normal"
                                        defaultValue={crawlRulesData.HTMLIDName}
                                        value={crawlRulesData.HTMLIDName}
                                        onChange={(e) =>
                                            updateSearchRuleHTMLIDName(
                                                index,
                                                crawlRuleIndex,
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                            </Grid>
                        )
                    )}
                </Grid>
            ))}
        </Grid>
    );
}

function WebpageCrawlRulesField({ spiderData, setSpiderData }) {
    const updateTag = (id, tag) => {
        spiderData.subfolders[0].crawlRules[id].tag = tag;
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const updateHTMLClassName = (id, HTMLClassName) => {
        spiderData.subfolders[0].crawlRules[id].HTMLClassName = HTMLClassName;
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const updateHTMLIDName = (id, HTMLIDName) => {
        spiderData.subfolders[0].crawlRules[id].HTMLIDName = HTMLIDName;
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const addCrawlRules = () => {
        spiderData.subfolders[0].crawlRules.push({
            tag: "p",
            HTMLClassName: "",
            HTMLIDName: "",
        });
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const removeCrawlRules = (id) => {
        spiderData.subfolders[0].crawlRules.splice(id, 1);
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    return (
        <Grid container spacing={0} sx={{ flexGrow: 0 }}>
            <Grid xs={2}>
                <Typography id="modal-modal-title" variant="h5" component="h6">
                    Crawl Rules
                </Typography>
            </Grid>
            <Grid xs={10}>
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-circle-outline" />}
                    onClick={() => addCrawlRules()}
                >
                    Add
                </Button>
            </Grid>
            {spiderData.subfolders[0].crawlRules.map(
                (crawlRulesData, index) => (
                    <Grid container spacing={0} sx={{ flexGrow: 0 }}>
                        <Grid xs={6}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Crawl Rule {index + 1}
                            </Typography>
                        </Grid>
                        <Grid xs={6}>
                            <Button
                                variant="contained"
                                color="inherit"
                                startIcon={<Iconify icon="eva:close-fill" />}
                                onClick={() => removeCrawlRules(index)}
                            ></Button>
                        </Grid>
                        <Grid xs={4}>
                            <TextField
                                label={"Tag " + (index + 1)}
                                name={"Tag " + (index + 1)}
                                margin="normal"
                                defaultValue={crawlRulesData.tag}
                                value={crawlRulesData.tag}
                                onChange={(e) =>
                                    updateTag(index, e.target.value)
                                }
                            />
                        </Grid>
                        <Grid xs={4}>
                            <TextField
                                label={"HTMLClassName " + (index + 1)}
                                name={"HTMLClassName " + (index + 1)}
                                margin="normal"
                                defaultValue={crawlRulesData.HTMLClassName}
                                value={crawlRulesData.HTMLClassName}
                                onChange={(e) =>
                                    updateHTMLClassName(index, e.target.value)
                                }
                            />
                        </Grid>
                        <Grid xs={4}>
                            <TextField
                                label={"HTMLIDName " + (index + 1)}
                                name={"HTMLIDName " + (index + 1)}
                                margin="normal"
                                defaultValue={crawlRulesData.HTMLIDName}
                                value={crawlRulesData.HTMLIDName}
                                onChange={(e) =>
                                    updateHTMLIDName(index, e.target.value)
                                }
                            />
                        </Grid>
                    </Grid>
                )
            )}
        </Grid>
    );
}

function FileTypeSelector({ spiderData, setSpiderData }) {
    const { data } = useQuery({
        queryKey: ["fileType"],
        queryFn: () => getFileType({ page: 0, filetypePerPage: 100 }),
        keepPreviousData: true,
    });

    return (
        <Grid xs={6}>
            <InputLabel>FileType</InputLabel>
            <Select
                multiline
                multiple
                displayEmpty
                value={spiderData.filetype}
                label="Type"
                onChange={(e) =>
                    setSpiderData({
                        ...spiderData,
                        filetype:
                            typeof e.target.value === "string"
                                ? e.target.value.split(",")
                                : e.target.value,
                    })
                }
                MenuProps={MenuProps}
                renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip
                                key={value}
                                label={data?.data?.detail[value - 1]?.type}
                            />
                        ))}
                    </Box>
                )}
            >
                {data?.data?.detail.map((word) => (
                    <MenuItem key={word.id} value={word.id}>
                        {word.type}
                    </MenuItem>
                ))}
            </Select>
        </Grid>
    );
}

export default function SpiderCreateModal(prop) {
    const [spiderData, setSpiderData] = useState({
        type: "WebsiteSpider",
        url: "",
        delay: 2,
        graphdeep: 3,
        maxThread: 1,
        keyword: [],
        filetype: [],
        subfolders: [
            {
                url: "",
                crawlRules: [
                    {
                        tag: "p",
                        HTMLClassName: "",
                        HTMLIDName: "",
                    },
                ],
                searchRules: [
                    {
                        tag: "a",
                        HTMLClassName: "",
                        HTMLIDName: "",
                    },
                ],
            },
            {
                url: "",
                crawlRules: [
                    {
                        tag: "p",
                        HTMLClassName: "",
                        HTMLIDName: "",
                    },
                ],
                searchRules: [
                    {
                        tag: "a",
                        HTMLClassName: "",
                        HTMLIDName: "",
                    },
                ],
            },
        ],
    });

    const profile = JSON.parse(localStorage.getItem("profile"));

    const { data } = useQuery({
        queryKey: ["keyword"],
        queryFn: () => getKeyword({ page: 0, keywordPerPage: 100 }),
        keepPreviousData: true,
    });

    const handleCreateWebpageSpider = async () => {
        const response = await createWebpageSpider(profile.id, spiderData);

        if (response.status == 201) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: "true",
            }).fire({
                icon: "success",
                title: "\n\nCreate webpage spider successfully. Please refresh page.",
            });

            setSpiderData({
                type: "WebsiteSpider",
                url: "",
                delay: 2,
                graphdeep: 3,
                maxThread: 1,
                keyword: [],
                filetype: [],
                subfolders: [
                    {
                        url: "",
                        crawlRules: [
                            {
                                tag: "p",
                                HTMLClassName: "",
                                HTMLIDName: "",
                            },
                        ],
                        searchRules: [
                            {
                                tag: "p",
                                HTMLClassName: "",
                                HTMLIDName: "",
                            },
                        ],
                    },
                    {
                        url: "",
                        crawlRules: [
                            {
                                tag: "p",
                                HTMLClassName: "",
                                HTMLIDName: "",
                            },
                        ],
                        searchRules: [
                            {
                                tag: "p",
                                HTMLClassName: "",
                                HTMLIDName: "",
                            },
                        ],
                    },
                ],
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
                title: "\n\nCreate webpage spider failed",
            });
        }
    };

    const handleCreateWebsiteSpider = async () => {
        const response = await createWebsiteSpider(profile.id, spiderData);

        if (response.status == 201) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: "true",
            }).fire({
                icon: "success",
                title: "\n\nCreate website spider successfully. Please refresh page.",
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
                title: "\n\nCreate website spider failed",
            });
        }
    };

    return (
        <Modal
            {...prop}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container spacing={0} sx={{ flexGrow: 0 }}>
                    <Grid xs={10}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Add Spider
                        </Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Button
                            variant="contained"
                            color="inherit"
                            startIcon={<Iconify icon="eva:brush-outline" />}
                            onClick={() =>
                                spiderData.type == "WebsiteSpider"
                                    ? handleCreateWebsiteSpider()
                                    : handleCreateWebpageSpider()
                            }
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
                <form
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Grid container spacing={0} sx={{ flexGrow: 0 }}>
                        <Grid xs={4}>
                            <TextField
                                label="Url"
                                name="url"
                                margin="normal"
                                defaultValue={spiderData.url}
                                value={spiderData.url}
                                onChange={(e) =>
                                    setSpiderData({
                                        ...spiderData,
                                        url: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid xs={4}>
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={spiderData.type}
                                label="Type"
                                onChange={(e) =>
                                    setSpiderData({
                                        ...spiderData,
                                        type: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={"WebsiteSpider"}>
                                    Website Spider
                                </MenuItem>
                                <MenuItem value={"WebpageSpider"}>
                                    Webpage Spider
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid xs={6}>
                            <InputLabel>Keyword</InputLabel>
                            <Select
                                multiline
                                multiple
                                displayEmpty
                                value={spiderData.keyword}
                                label="Type"
                                onChange={(e) =>
                                    setSpiderData({
                                        ...spiderData,
                                        keyword:
                                            typeof e.target.value === "string"
                                                ? e.target.value.split(",")
                                                : e.target.value,
                                    })
                                }
                                MenuProps={MenuProps}
                                renderValue={(selected) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5,
                                        }}
                                    >
                                        {selected.map((value) => (
                                            <Chip
                                                key={value}
                                                label={
                                                    data?.data?.detail[
                                                        value - 1
                                                    ]?.name
                                                }
                                            />
                                        ))}
                                    </Box>
                                )}
                            >
                                {data?.data?.detail.map((word) => (
                                    <MenuItem key={word.id} value={word.id}>
                                        {word.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <FileTypeSelector
                            spiderData={spiderData}
                            setSpiderData={setSpiderData}
                        />
                    </Grid>
                    {spiderData.type == "WebsiteSpider" && (
                        <Grid container spacing={0} sx={{ flexGrow: 0 }}>
                            <Grid xs={4}>
                                <TextField
                                    label="Graph Depth"
                                    name="graph Depth"
                                    margin="normal"
                                    type="number"
                                    defaultValue={spiderData.graphdeep}
                                    value={spiderData.graphdeep}
                                    onChange={(e) =>
                                        setSpiderData({
                                            ...spiderData,
                                            graphdeep: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    label="Delay"
                                    name="delay"
                                    margin="normal"
                                    type="number"
                                    defaultValue={spiderData.delay}
                                    value={spiderData.delay}
                                    onChange={(e) =>
                                        setSpiderData({
                                            ...spiderData,
                                            delay: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    label="Max Thread"
                                    name="max Thread"
                                    margin="normal"
                                    type="number"
                                    defaultValue={spiderData.maxThread}
                                    value={spiderData.maxThread}
                                    onChange={(e) =>
                                        setSpiderData({
                                            ...spiderData,
                                            maxThread: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                    )}
                    {spiderData.type == "WebpageSpider" && (
                        <WebpageCrawlRulesField
                            spiderData={spiderData}
                            setSpiderData={setSpiderData}
                        />
                    )}
                    {spiderData.type == "WebsiteSpider" && (
                        <WebsiteCrawlRulesField
                            spiderData={spiderData}
                            setSpiderData={setSpiderData}
                        />
                    )}
                </form>
            </Box>
        </Modal>
    );
}
