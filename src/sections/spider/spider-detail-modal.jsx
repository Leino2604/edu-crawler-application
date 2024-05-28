import { Fragment } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import Grid from "@mui/material/Unstable_Grid2";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";

import {
    getWebpageSpiderCrawlRulesById,
    getWebsiteSpiderCrawlRulesById,
    getWebsiteSpiderSearchRulesById,
} from "../../services/spider.api";

function WebpageSpiderCrawlRulesModal({ spiderId }) {
    const { data } = useQuery({
        queryKey: ["webpageSpiderCrawlRules", spiderId],
        queryFn: () => getWebpageSpiderCrawlRulesById(spiderId),
        placeholderData: keepPreviousData,
    });

    return data?.data?.length != 0 ? (
        <>
            <DialogContentText sx={{ fontWeight: "bold", color: "#1877f2" }}>
                Crawl Rules
            </DialogContentText>
            <Grid container spacing={2} margin={1}>
                {data?.data?.map((crawlRulesData, index) => (
                    <Fragment key={index}>
                        <Grid xs={4}>
                            <TextField
                                fullWidth
                                id={`tagName${index + 1}`}
                                name={`tagName${index + 1}`}
                                label={`Tag Name ${index + 1}`}
                                value={crawlRulesData.Tag || "All"}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid xs={4}>
                            <TextField
                                fullWidth
                                id={`className${index + 1}`}
                                name={`className${index + 1}`}
                                label={`Class Name ${index + 1}`}
                                value={crawlRulesData.ClassName || "All"}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid xs={4}>
                            <TextField
                                fullWidth
                                id={`idName${index + 1}`}
                                name={`idName${index + 1}`}
                                label={`Id Name ${index + 1}`}
                                value={crawlRulesData.IDName || "All"}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Fragment>
                ))}
            </Grid>
        </>
    ) : (
        <></>
    );
}

function WebsiteSpiderCrawlRulesModal({ spiderId }) {
    const { data } = useQuery({
        queryKey: ["websiteSpiderCrawlRules", spiderId],
        queryFn: () => getWebsiteSpiderCrawlRulesById(spiderId),
        keepPreviousData: true,
    });

    return data?.data?.length != 0 ? (
        <>
            <DialogContentText sx={{ fontWeight: "bold", color: "#1877f2" }}>
                Crawl Rules
            </DialogContentText>
            <Grid container spacing={2} margin={1}>
                {data?.data?.map((crawlRulesData, index) => (
                    <Fragment key={index}>
                        <Grid xs={3}>
                            <TextField
                                fullWidth
                                id={`subfolder${index + 1}`}
                                name={`subfolder${index + 1}`}
                                label={`Subfolder ${index + 1}`}
                                value={crawlRulesData.Name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid xs={3}>
                            <TextField
                                fullWidth
                                id={`tagName${index + 1}`}
                                name={`tagName${index + 1}`}
                                label={`Tag Name ${index + 1}`}
                                value={crawlRulesData.Tag || "All"}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid xs={3}>
                            <TextField
                                fullWidth
                                id={`className${index + 1}`}
                                name={`className${index + 1}`}
                                label={`Class Name ${index + 1}`}
                                value={crawlRulesData.ClassName || "All"}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid xs={3}>
                            <TextField
                                fullWidth
                                id={`idName${index + 1}`}
                                name={`idName${index + 1}`}
                                label={`Id Name ${index + 1}`}
                                value={crawlRulesData.IDName || "All"}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Fragment>
                ))}
            </Grid>
        </>
    ) : (
        <></>
    );
}

function WebsiteSpiderSearchRulesModal({ spiderId }) {
    const { data } = useQuery({
        queryKey: ["websiteSpiderSearchRules", spiderId],
        queryFn: () => getWebsiteSpiderSearchRulesById(spiderId),
        keepPreviousData: true,
    });

    return data?.data?.length != 0 ? (
        <>
            <DialogContentText sx={{ fontWeight: "bold", color: "#1877f2" }}>
                Search Rules
            </DialogContentText>
            <Grid container spacing={2} margin={1}>
                {data?.data?.map((crawlRulesData, index) => (
                    <Fragment key={index}>
                        <Grid xs={3}>
                            <TextField
                                fullWidth
                                id={`subfolder${index + 1}`}
                                name={`subfolder${index + 1}`}
                                label={`Subfolder ${index + 1}`}
                                value={crawlRulesData.Name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid xs={3}>
                            <TextField
                                fullWidth
                                id={`tagName${index + 1}`}
                                name={`tagName${index + 1}`}
                                label={`Tag Name ${index + 1}`}
                                value={crawlRulesData.Tag || "All"}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid xs={3}>
                            <TextField
                                fullWidth
                                id={`className${index + 1}`}
                                name={`className${index + 1}`}
                                label={`Class Name ${index + 1}`}
                                value={crawlRulesData.ClassName || "All"}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid xs={3}>
                            <TextField
                                fullWidth
                                id={`idName${index + 1}`}
                                name={`idName${index + 1}`}
                                label={`Id Name ${index + 1}`}
                                value={crawlRulesData.IDName || "All"}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Fragment>
                ))}
            </Grid>
        </>
    ) : (
        <></>
    );
}

function WebsiteSpiderSubfolderModal({ spiderId }) {
    return (
        <>
            <WebsiteSpiderCrawlRulesModal spiderId={spiderId} />
            <WebsiteSpiderSearchRulesModal spiderId={spiderId} />
        </>
    );
}

export default function SpiderDetailModal(prop) {
    const {
        Id,
        Type,
        Url,
        Status,
        Delay,
        GraphDeep,
        MaxThread,
        Keyword,
        FileType,
        LastRunDate,
        LastEndDate,
        RunTime,
        TotalPage,
        LastRunNewArticle,
        LastRunUpdateArticle,
        LastRunUnchangeArticle,
        IsSchedule,
        ScheduleTime,
    } = prop.article;
    const KeywordList = Keyword ? Keyword.map((data) => data.Value) : [];
    const FileTypeList = FileType ? FileType.map((data) => data.Value) : [];
    const convertSecondsToTimeFormat = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

        return `${hours}:${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <Dialog {...prop} fullWidth maxWidth="md">
            <DialogTitle>Spider {Id}</DialogTitle>
            <DialogContent>
                <DialogContentText
                    sx={{ fontWeight: "bold", color: "#1877f2" }}
                >
                    Basic Configuration
                </DialogContentText>
                <Grid container spacing={2} margin={1}>
                    <Grid xs={4}>
                        <TextField
                            fullWidth
                            id="url"
                            name="url"
                            label="Url"
                            value={Url}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            fullWidth
                            id="type"
                            name="type"
                            label="Type"
                            value={Type}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            fullWidth
                            id="status"
                            name="status"
                            label="Status"
                            value={Status}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    {Type == "WebsiteSpider" && (
                        <>
                            <Grid xs={4}>
                                <TextField
                                    fullWidth
                                    id="delay"
                                    name="delay"
                                    label="Delay"
                                    value={`${Delay}s`}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    fullWidth
                                    id="graphDeep"
                                    name="graphDeep"
                                    label="Graph Deep"
                                    value={GraphDeep}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    fullWidth
                                    id="maxThread"
                                    name="maxThread"
                                    label="Max Thread"
                                    value={MaxThread}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </>
                    )}

                    <Grid xs={6}>
                        <TextField
                            fullWidth
                            id="isScheduled"
                            name="isScheduled"
                            label="Is Scheduled"
                            value={IsSchedule == true ? "Yes" : "No"}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            fullWidth
                            id="scheduleTime"
                            name="scheduleTime"
                            label="Schedule Time"
                            value={ScheduleTime}
                            disabled={IsSchedule == false}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            id="keyword"
                            name="keyword"
                            label="Allowed Keyword"
                            value={
                                KeywordList.length == 0
                                    ? "All"
                                    : KeywordList.join(", ")
                            }
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            id="fileType"
                            name="fileType"
                            label="Allowed File Type"
                            value={
                                FileTypeList.length == 0
                                    ? "All"
                                    : FileTypeList.join(", ")
                            }
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>

                {Type == "WebsiteSpider" && (
                    <WebsiteSpiderSubfolderModal spiderId={Id} />
                )}
                {Type == "WebpageSpider" && (
                    <WebpageSpiderCrawlRulesModal spiderId={Id} />
                )}

                <DialogContentText
                    sx={{ fontWeight: "bold", color: "#1877f2" }}
                >
                    Spider Stats
                </DialogContentText>
                <Grid container spacing={2} margin={1}>
                    <Grid xs={4}>
                        <TextField
                            fullWidth
                            multiline
                            id="lastRunDate"
                            name="lastRunDate"
                            label="Last Run Date"
                            value={
                                LastRunDate
                                    ? LastRunDate
                                    : "This spider hasn't been launched"
                            }
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            fullWidth
                            multiline
                            id="lastEndDate"
                            name="lastEndDate"
                            label="Last End Date"
                            value={
                                LastEndDate
                                    ? LastEndDate
                                    : "This spider hasn't been launched"
                            }
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            fullWidth
                            multiline
                            id="runTime"
                            name="runTime"
                            label="Run Rime"
                            value={convertSecondsToTimeFormat(RunTime)}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    {Type == "WebsiteSpider" && (
                        <>
                            <Grid xs={3}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="fileType"
                                    name="fileType"
                                    label="Total Page"
                                    value={TotalPage}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid xs={3}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="fileType"
                                    name="fileType"
                                    label="Last Run New Article"
                                    value={LastRunNewArticle}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid xs={3}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="fileType"
                                    name="fileType"
                                    label="Last Run Update Article"
                                    value={LastRunUpdateArticle}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid xs={3}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="fileType"
                                    name="fileType"
                                    label="Last Run Unchange Article"
                                    value={LastRunUnchangeArticle}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </>
                    )}
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
