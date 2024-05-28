import { Add, Close } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
    Box,
    Button,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tab,
    TextField,
    Typography,
    tabsClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";

const DynamicWebsiteTabs = ({ spiderData, setSpiderData }) => {
    const [tabs, setTabs] = useState([
        {
            id: 1,
            label: "Subfolder 1",
            content: {
                url: "",
                crawlRules: [{ tag: "", HTMLClassName: "", HTMLIDName: "" }],
                searchRules: [{ tag: "", HTMLClassName: "", HTMLIDName: "" }],
            },
        },
    ]);
    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setTabs(
            spiderData?.subfolders?.map((subfolder, index) => ({
                id: subfolder.id,
                label: `Subfolder ${index + 1}`,
                content: {
                    url: subfolder.url,
                    crawlRules: spiderData?.subfolders?.[index]?.crawlRules,
                    searchRules: spiderData?.subfolders?.[index]?.searchRules,
                },
            }))
        );
    }, [spiderData]);

    const handleAddTab = () => {
        spiderData.subfolders.push({
            id: tabs[tabs.length - 1].id + 1,
            url: "",
            crawlRules: [
                {
                    id: 1,
                    subfolderID: tabs[tabs.length - 1].id + 1,
                    tag: "p",
                    HTMLClassName: "",
                    HTMLIDName: "",
                },
            ],
            searchRules: [
                {
                    id: 1,
                    subfolderID: tabs[tabs.length - 1].id + 1,
                    tag: "a",
                    HTMLClassName: "",
                    HTMLIDName: "",
                },
            ],
        });
        setValue(tabs[tabs.length - 1].id + 1);
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const handleDeleteTab = (tabId) => {
        const newTabs = tabs.filter((tab) => tab.id !== tabId);
        setTabs(newTabs);
        if (value >= newTabs.length) {
            setValue(newTabs.length - 1);
        }
    };

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

    const removeSubfolder = (id) => {
        spiderData.subfolders.splice(id, 1);
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    // const addCrawlRules = (subfolderID) => {
    //     spiderData.subfolders[subfolderID].crawlRules.push({
    //         tag: "p",
    //         HTMLClassName: "",
    //         HTMLIDName: "",
    //     });
    //     setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    // };

    // const removeCrawlRules = (subfolderID, id) => {
    //     spiderData.subfolders[subfolderID].crawlRules.splice(id, 1);
    //     setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    // };

    // const addSearchRules = (subfolderID) => {
    //     spiderData.subfolders[subfolderID].searchRules.push({
    //         tag: "p",
    //         HTMLClassName: "",
    //         HTMLIDName: "",
    //     });
    //     setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    // };

    // const removeSearchRules = (subfolderID, id) => {
    //     spiderData.subfolders[subfolderID].searchRules.splice(id, 1);
    //     setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    // };

    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: {
                                "&.Mui-disabled": { opacity: 0.3 },
                            },
                        }}
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                value={tab.id}
                                key={tab.id}
                                label={
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        {tab.label}
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteTab(tab.id);
                                            }}
                                            sx={{ marginLeft: 1 }}
                                        >
                                            <Close fontSize="small" />
                                        </IconButton>
                                    </div>
                                }
                            />
                        ))}
                        <Tab
                            value={tabs.length + 1}
                            label={
                                <Button
                                    startIcon={<Add />}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddTab();
                                    }}
                                >
                                    Add Subfolder
                                </Button>
                            }
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddTab();
                            }}
                        />
                    </TabList>
                </Box>
                {tabs.map((tab, index) => (
                    <TabPanel key={tab.id} value={tab.id} index={index}>
                        <Grid container spacing={2} columns={12}>
                            <Grid xs={12}>
                                <TextField
                                    fullWidth
                                    id={`url${index + 1}`}
                                    name={`url${index + 1}`}
                                    label={`Url ${index + 1}`}
                                    value={tab?.content?.url}
                                    onChange={(e) =>
                                        updateUrl(index, e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid xs={12}>
                                <DialogContentText sx={{ color: "black" }}>
                                    Crawl Rule
                                </DialogContentText>
                            </Grid>
                            {tab?.content?.crawlRules?.map(
                                (crawlRule, index1) => (
                                    <>
                                        <Grid xs={4}>
                                            <TextField
                                                fullWidth
                                                id={`crawlTagName${index + 1}`}
                                                name={`crawltagName${
                                                    index + 1
                                                }`}
                                                label={`Tag Name ${index + 1}`}
                                                value={crawlRule?.tag}
                                                onChange={(e) =>
                                                    updateTag(
                                                        index,
                                                        index1,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Grid>
                                        <Grid xs={4}>
                                            <TextField
                                                fullWidth
                                                id={`crawlClassName${
                                                    index + 1
                                                }`}
                                                name={`crawlClassName${
                                                    index + 1
                                                }`}
                                                label={`Class Name ${
                                                    index + 1
                                                }`}
                                                value={crawlRule?.HTMLClassName}
                                                onChange={(e) =>
                                                    updateHTMLClassName(
                                                        index,
                                                        index1,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Grid>
                                        <Grid xs={4}>
                                            <TextField
                                                fullWidth
                                                id={`crawlIdName${index + 1}`}
                                                name={`crawlIdName${index + 1}`}
                                                label={`Id Name ${index + 1}`}
                                                value={crawlRule?.HTMLIDName}
                                                onChange={(e) =>
                                                    updateHTMLIDName(
                                                        index,
                                                        index1,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Grid>
                                        {/* <Grid
                                            xs={1}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <IconButton
                                                color="error"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteTab(tab.id);
                                                }}
                                            >
                                                <Close />
                                            </IconButton>
                                        </Grid> */}
                                    </>
                                )
                            )}
                            <Grid xs={12}>
                                <DialogContentText sx={{ color: "black" }}>
                                    Search Rule
                                </DialogContentText>
                            </Grid>
                            {tab?.content?.searchRules?.map(
                                (searchRule, index1) => (
                                    <>
                                        <Grid xs={4}>
                                            <TextField
                                                fullWidth
                                                id={`searchTagName${index + 1}`}
                                                name={`searchTagName${
                                                    index + 1
                                                }`}
                                                label={`Tag Name ${index + 1}`}
                                                value={searchRule?.tag}
                                                onChange={(e) =>
                                                    updateSearchRuleTag(
                                                        index,
                                                        index1,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Grid>
                                        <Grid xs={4}>
                                            <TextField
                                                fullWidth
                                                id={`searchClassName${
                                                    index + 1
                                                }`}
                                                name={`searchClassName${
                                                    index + 1
                                                }`}
                                                label={`Class Name ${
                                                    index + 1
                                                }`}
                                                value={
                                                    searchRule?.HTMLClassName
                                                }
                                                onChange={(e) =>
                                                    updateSearchRuleHTMLClassName(
                                                        index,
                                                        index1,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Grid>
                                        <Grid xs={4}>
                                            <TextField
                                                fullWidth
                                                id={`searchIdName${index + 1}`}
                                                name={`searchIdName${
                                                    index + 1
                                                }`}
                                                label={`Id Name ${index + 1}`}
                                                value={searchRule?.HTMLIDName}
                                                onChange={(e) =>
                                                    updateSearchRuleHTMLIDName(
                                                        index,
                                                        index1,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Grid>

                                        {/* <Grid
                                            xs={1}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <IconButton
                                                color="error"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteTab(tab.id);
                                                }}
                                            >
                                                <Close />
                                            </IconButton>
                                        </Grid> */}
                                    </>
                                )
                            )}
                        </Grid>
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
};

export default DynamicWebsiteTabs;
