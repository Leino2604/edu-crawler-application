import { Add, Close } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
    Box,
    Button,
    IconButton,
    Tab,
    TextField,
    tabsClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";

const DynamicWebpageTabs = ({ spiderData, setSpiderData }) => {
    const [tabs, setTabs] = useState([
        {
            id: 1,
            label: "Crawl Rule 1",
            content: { tag: "", HTMLClassName: "", HTMLIDName: "" },
        },
    ]);
    const [value, setValue] = useState(1);

    useEffect(() => {
        setTabs(
            spiderData?.subfolders?.[0]?.crawlRules?.map((crawlRule) => ({
                id: crawlRule.id,
                label: `Crawl Rule ${crawlRule.id}`,
                content: crawlRule,
            }))
        );
    }, [spiderData]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddTab = () => {
        spiderData.subfolders[0].crawlRules.push({
            id: tabs[tabs.length - 1].id + 1,
            tag: "p",
            HTMLClassName: "",
            HTMLIDName: "",
        });
        setValue(tabs[tabs.length - 1].id + 1);
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

    const handleDeleteTab = (id) => {
        spiderData.subfolders[0].crawlRules.splice(id, 1);
        setSpiderData({ ...spiderData, subfolders: spiderData.subfolders });
    };

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
                                                e.preventDefault();
                                                handleDeleteTab(index);
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
                            value={0}
                            label={
                                <Button startIcon={<Add />}>
                                    Add Crawl Rule
                                </Button>
                            }
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleAddTab();
                            }}
                        />
                    </TabList>
                </Box>
                {tabs.map((tab, index) => (
                    <TabPanel key={tab.id} value={tab.id} index={index}>
                        <Grid container spacing={2}>
                            <Grid xs={4}>
                                <TextField
                                    fullWidth
                                    id={`tagName${tab.id}`}
                                    name={`tagName${tab.id}`}
                                    label={`Tag Name ${tab.id}`}
                                    value={tab?.content?.tag}
                                    onChange={(e) => {
                                        updateTag(index, e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    fullWidth
                                    id={`className${tab.id}`}
                                    name={`className${tab.id}`}
                                    label={`Class Name ${tab.id}`}
                                    value={tab?.content?.HTMLClassName}
                                    onChange={(e) => {
                                        updateHTMLClassName(
                                            index,
                                            e.target.value
                                        );
                                    }}
                                />
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    fullWidth
                                    id={`idName${tab.id}`}
                                    name={`idName${tab.id}`}
                                    label={`Id Name ${tab.id}`}
                                    value={tab?.content?.HTMLIDName}
                                    onChange={(e) => {
                                        updateHTMLIDName(index, e.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
};

export default DynamicWebpageTabs;
