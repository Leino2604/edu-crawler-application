import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import Grid from "@mui/material/Unstable_Grid2";

import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Iconify from "../../components/iconify";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getKeyword } from "../../services/keyword.api";
import { getFileType } from "../../services/filetype.api";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Tab,
    TextField,
} from "@mui/material";

import { addWebpageSpider, addWebsiteSpider } from "../../services/spider.api";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DynamicWebpageTabs from "./dynamic-webpage-tabs";
import DynamicWebsiteTabs from "./dynamic-website-tabs";

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

const StaticTabs = ({ spiderData, setSpiderData }) => {
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                    >
                        <Tab label="Keyword" value="1" />
                        <Tab label="File Type" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <KeywordSelector
                        spiderData={spiderData}
                        setSpiderData={setSpiderData}
                    />
                </TabPanel>
                <TabPanel value="2">
                    <FileTypeSelector
                        spiderData={spiderData}
                        setSpiderData={setSpiderData}
                    />
                </TabPanel>
            </TabContext>
        </Box>
    );
};

function FileTypeSelector({ spiderData, setSpiderData }) {
    const { data } = useQuery({
        queryKey: ["fileType"],
        queryFn: () => getFileType({ page: 0, filetypePerPage: 100 }),
        placeholderData: keepPreviousData,
    });

    const getNameById = (id) => {
        const filetype = data?.data?.detail?.find((k) => k.id === id);
        return filetype ? filetype.type : null;
    };

    return (
        <FormControl fullWidth>
            <InputLabel>File Type</InputLabel>
            <Select
                multiple
                multiline
                id="fileType"
                name="fileType"
                label="File Type"
                value={spiderData?.filetype}
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
                            <Chip key={value} label={getNameById(value)} />
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
        </FormControl>
    );
}

function KeywordSelector({ spiderData, setSpiderData }) {
    const { data } = useQuery({
        queryKey: ["keyword"],
        queryFn: () => getKeyword({ page: 0, keywordPerPage: 100 }),
        placeholderData: keepPreviousData,
    });

    const getNameById = (id) => {
        const keyword = data?.data?.detail?.find((k) => k.id === id);
        return keyword ? keyword.name : null;
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Keyword</InputLabel>
            <Select
                multiline
                multiple
                id="keyword"
                name="keyword"
                label="Keyword"
                value={spiderData?.keyword}
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
                            <Chip key={value} label={getNameById(value)} />
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
        </FormControl>
    );
}

export default function SpiderAddModal(props) {
    const [spiderData, setSpiderData] = useState({
        url: "",
        type: "WebsiteSpider",
        delay: 2,
        graphdeep: 3,
        maxThread: 1,
        keyword: [],
        filetype: [],
        subfolders: [
            {
                id: 1,
                url: "",
                crawlRules: [
                    {
                        id: 1,
                        tag: "p",
                        HTMLClassName: "",
                        HTMLIDName: "",
                    },
                ],
                searchRules: [
                    {
                        id: 1,
                        tag: "a",
                        HTMLClassName: "",
                        HTMLIDName: "",
                    },
                ],
            },
        ],
    });

    const profile = JSON.parse(localStorage.getItem("profile"));

    const handleAddWebpageSpider = async () => {
        const response = addWebpageSpider(profile.id, spiderData);

        if (response.status == 201) {
            props.refetchRow();
            props.onClose();
            setSpiderData({
                url: "",
                type: "WebsiteSpider",
                delay: 2,
                graphdeep: 3,
                maxThread: 1,
                keyword: [],
                filetype: [],
                subfolders: [
                    {
                        id: 1,
                        url: "",
                        crawlRules: [
                            {
                                id: 1,
                                tag: "p",
                                HTMLClassName: "",
                                HTMLIDName: "",
                            },
                        ],
                        searchRules: [
                            {
                                id: 1,
                                tag: "a",
                                HTMLClassName: "",
                                HTMLIDName: "",
                            },
                        ],
                    },
                ],
            });
        }
    };
    const handleAddWebsiteSpider = async () => {
        const response = await addWebsiteSpider(profile.id, spiderData);

        if (response.status == 201) {
            props.refetchRow();
            props.onClose();
            setSpiderData({
                url: "",
                type: "WebsiteSpider",
                delay: 2,
                graphdeep: 3,
                maxThread: 1,
                keyword: [],
                filetype: [],
                subfolders: [
                    {
                        id: 1,
                        url: "",
                        crawlRules: [
                            {
                                id: 1,
                                tag: "p",
                                HTMLClassName: "",
                                HTMLIDName: "",
                            },
                        ],
                        searchRules: [
                            {
                                id: 1,
                                tag: "a",
                                HTMLClassName: "",
                                HTMLIDName: "",
                            },
                        ],
                    },
                ],
            });
        }
    };

    return (
        <Dialog
            {...props}
            fullWidth
            maxWidth="md"
            PaperProps={{
                component: "form",
                onSubmit: (event) => {
                    event.preventDefault();
                    spiderData.type == "WebsiteSpider"
                        ? handleAddWebsiteSpider()
                        : handleAddWebpageSpider();
                },
            }}
        >
            <DialogTitle>Add Spider</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} margin={1}>
                    <Grid xs={6}>
                        <TextField
                            fullWidth
                            id="url"
                            name="url"
                            label="Url"
                            value={spiderData?.url}
                            onChange={(e) =>
                                setSpiderData({
                                    ...spiderData,
                                    url: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                                id="type"
                                name="type"
                                label="Type"
                                value={spiderData?.type}
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
                        </FormControl>
                    </Grid>
                    {spiderData?.type == "WebsiteSpider" && (
                        <>
                            <Grid xs={4}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    id="delay"
                                    name="delay"
                                    label="Delay"
                                    value={spiderData?.delay}
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
                                    fullWidth
                                    type="number"
                                    id="graphDeep"
                                    name="graphDeep"
                                    label="Graph Deep"
                                    value={spiderData?.graphdeep}
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
                                    fullWidth
                                    type="number"
                                    id="maxThread"
                                    name="maxThread"
                                    label="Max Thread"
                                    value={spiderData?.maxThread}
                                    onChange={(e) =>
                                        setSpiderData({
                                            ...spiderData,
                                            maxThread: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </>
                    )}
                    <Grid xs={12}>
                        <StaticTabs
                            spiderData={spiderData}
                            setSpiderData={setSpiderData}
                        />
                    </Grid>
                    <Grid xs={12}>
                        {spiderData?.type == "WebpageSpider" && (
                            <DynamicWebpageTabs
                                spiderData={spiderData}
                                setSpiderData={setSpiderData}
                            />
                        )}
                        {spiderData?.type == "WebsiteSpider" && (
                            <DynamicWebsiteTabs
                                spiderData={spiderData}
                                setSpiderData={setSpiderData}
                            />
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={() => {
                        props.onClose();
                        setSpiderData({
                            url: "",
                            type: "WebsiteSpider",
                            delay: 2,
                            graphdeep: 3,
                            maxThread: 1,
                            keyword: [],
                            filetype: [],
                            subfolders: [
                                {
                                    id: 1,
                                    url: "",
                                    crawlRules: [
                                        {
                                            id: 1,
                                            tag: "p",
                                            HTMLClassName: "",
                                            HTMLIDName: "",
                                        },
                                    ],
                                    searchRules: [
                                        {
                                            id: 1,
                                            tag: "a",
                                            HTMLClassName: "",
                                            HTMLIDName: "",
                                        },
                                    ],
                                },
                            ],
                        });
                    }}
                >
                    Cancel
                </Button>
                <Button variant="contained" type="submit">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
