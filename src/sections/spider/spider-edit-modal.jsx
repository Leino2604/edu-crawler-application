import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Iconify from "../../components/iconify";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Tab,
    TextField,
} from "@mui/material";

import { getKeyword } from "../../services/keyword.api";
import { getFileType } from "../../services/filetype.api";
import {
    editSpiderUrlById,
    editSpiderBasicSettingById,
    editWebsiteSpiderSubfolderById,
    editWebpageSpiderCrawlRulesById,
    getWebpageSpiderCrawlRulesById,
    getWebsiteSpiderCrawlRulesById,
    getWebsiteSpiderSearchRulesById,
} from "../../services/spider.api";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DynamicWebpageTabs from "./dynamic-webpage-tabs";
import DynamicWebsiteTabs from "./dynamic-website-tabs";
import Swal from "sweetalert2";

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
                    <TabList onChange={handleChange}>
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
        <Select
            fullWidth
            autoFocus
            multiline
            multiple
            id="fileType"
            name="fileType"
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
        <Select
            fullWidth
            autoFocus
            multiline
            multiple
            id="keyword"
            name="keyword"
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
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={getNameById(value)} />
                    ))}
                </Box>
            )}
        >
            {data?.data?.detail?.map((word) => (
                <MenuItem key={word.id} value={word.id}>
                    {word.name}
                </MenuItem>
            ))}
        </Select>
    );
}

export default function SpiderEditModal(props) {
    const { Id, Type, Url, Delay, GraphDeep, MaxThread, Keyword, FileType } =
        props.article;
    const KeywordList = !!Keyword?.length ? Keyword.map((data) => data.Id) : [];
    const FileTypeList = !!FileType?.length
        ? FileType.map((data) => data.Id)
        : [];
    const [spiderData, setSpiderData] = useState(null);

    const { data: webpageCrawl } = useQuery({
        queryKey: ["webpageSpiderCrawlRules", Id],
        queryFn: () => getWebpageSpiderCrawlRulesById(Id),
        enabled: Type == "WebpageSpider",
        placeholderData: keepPreviousData,
    });
    const { data: websiteCrawl } = useQuery({
        queryKey: ["websiteSpiderCrawlRules", Id],
        queryFn: () => getWebsiteSpiderCrawlRulesById(Id),
        enabled: Type == "WebsiteSpider",
        keepPreviousData: true,
    });
    const { data: websiteSearch } = useQuery({
        queryKey: ["websiteSpiderSearchRules", Id],
        queryFn: () => getWebsiteSpiderSearchRulesById(Id),
        enabled: Type == "WebsiteSpider",
        keepPreviousData: true,
    });

    useEffect(() => {
        if (Type == "WebpageSpider") {
            setSpiderData({
                url: Url,
                type: Type,
                delay: Delay,
                graphdeep: GraphDeep,
                maxThread: MaxThread,
                keyword: KeywordList,
                filetype: FileTypeList,
                subfolders: [
                    {
                        url: "",
                        crawlRules: !!webpageCrawl?.data?.length
                            ? webpageCrawl?.data?.map(
                                  ({ Tag, ClassName, IDName }, index) => ({
                                      id: index + 1,
                                      tag: Tag,
                                      HTMLClassName: ClassName,
                                      HTMLIDName: IDName,
                                  })
                              )
                            : [
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
        } else {
            const combined = {};

            const processRules = (rules, type) => {
                let currentSubfolderID = null;
                let ruleIdCounter = 1;

                rules?.forEach((item) => {
                    if (currentSubfolderID !== item.SubfolderID) {
                        currentSubfolderID = item.SubfolderID;
                        ruleIdCounter = 1;
                    }

                    if (!combined[item.Name]) {
                        combined[item.Name] = {
                            id: item.SubfolderID,
                            url: item.Name,
                            crawlRules: [],
                            searchRules: [],
                        };
                    }

                    combined[item.Name][type].push({
                        id: item.SearchRuleID || item.CrawlRuleID,
                        subfolderId: item.SubfolderID,
                        tag: item.Tag,
                        HTMLClassName: item.ClassName,
                        HTMLIDName: item.IDName,
                    });
                });
            };

            processRules(websiteCrawl?.data, "crawlRules");
            processRules(websiteSearch?.data, "searchRules");

            const result = Object.values(combined);

            setSpiderData({
                url: Url,
                type: Type,
                delay: Delay,
                graphdeep: GraphDeep,
                maxThread: MaxThread,
                keyword: KeywordList,
                filetype: FileTypeList,
                subfolders: result,
            });
        }
    }, [props, webpageCrawl, websiteCrawl, websiteSearch]);

    const handleEditWebpageSpider = async () => {
        const response = await editSpiderUrlById(
            Id,
            spiderData?.url ? spiderData?.url : Url,
            spiderData?.keyword ? spiderData?.keyword : KeywordList,
            spiderData?.filetype ? spiderData?.filetype : FileTypeList
        );
        const response1 = await editWebpageSpiderCrawlRulesById(
            Id,
            spiderData?.subfolders[0].crawlRules
        );
        if (response.status == 200 && response1.status == 200) {
            props.refetch();
            props.refetchRow();
            props.onClose();
        }
    };

    const handleEditWebsiteSpider = async () => {
        const response1 = await editSpiderBasicSettingById({
            spider_id: Id,
            delay: spiderData?.delay ? parseInt(spiderData?.delay) : Delay,
            graph_deep: spiderData?.graphdeep
                ? parseInt(spiderData?.graphdeep)
                : GraphDeep,
            max_thread: spiderData?.maxThread
                ? parseInt(spiderData?.maxThread)
                : MaxThread,
        });
        const response2 = await editSpiderUrlById(
            Id,
            spiderData?.url ? spiderData?.url : Url,
            spiderData?.keyword ? spiderData?.keyword : KeywordList,
            spiderData?.filetype ? spiderData?.filetype : FileTypeList
        );
        const response3 = await editWebsiteSpiderSubfolderById(Id, spiderData);
        if (
            response1.status == 200 &&
            response2.status == 200 &&
            response3.status == 200
        ) {
            props.refetch();
            props.refetchRow();
            props.onClose();
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
                        ? handleEditWebsiteSpider()
                        : handleEditWebpageSpider();
                },
            }}
        >
            <DialogTitle>Edit Spider {Id}</DialogTitle>
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
                        <TextField
                            disabled
                            fullWidth
                            id="type"
                            name="type"
                            label="Type"
                            value={
                                spiderData?.type == "WebsiteSpider"
                                    ? "Website Spider"
                                    : "Webpage Spider"
                            }
                        />
                    </Grid>
                    {Type == "WebsiteSpider" && (
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
                        {Type == "WebpageSpider" && (
                            <DynamicWebpageTabs
                                spiderData={spiderData}
                                setSpiderData={setSpiderData}
                            ></DynamicWebpageTabs>
                        )}
                        {Type == "WebsiteSpider" && (
                            <DynamicWebsiteTabs
                                spiderData={spiderData}
                                setSpiderData={setSpiderData}
                            ></DynamicWebsiteTabs>
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
