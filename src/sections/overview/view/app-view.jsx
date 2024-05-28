import { faker } from "@faker-js/faker";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "../../../components/iconify";
import {
    getStatus,
    getTop10,
    getTotalArticle,
    getTotalArticle7Days,
    getTotalBadCrawl,
    getTotalGoodCrawl,
    getTotalRunTime,
    getTotalRunTime7Days,
} from "../../../services/dashboard.api";

import AppTasks from "../app-tasks";
import AppNewsUpdate from "../app-news-update";
import AppOrderTimeline from "../app-order-timeline";
import AppCurrentVisits from "../app-current-visits";
import AppWebsiteVisits from "../app-website-visits";
import AppWidgetSummary from "../app-widget-summary";
import AppTrafficBySite from "../app-traffic-by-site";
import AppCurrentSubject from "../app-current-subject";
import AppConversionRates from "../app-conversion-rates";
import { useQuery } from "@tanstack/react-query";

// ----------------------------------------------------------------------

export default function AppView() {
    const { data: totalTime } = useQuery({
        queryKey: ["totaltime"],
        queryFn: () => getTotalRunTime(),
    });
    const { data: totalTime7Days } = useQuery({
        queryKey: ["totaltime7days"],
        queryFn: () => getTotalRunTime7Days(),
    });
    const { data: totalArticle } = useQuery({
        queryKey: ["totalarticle"],
        queryFn: () => getTotalArticle(),
    });
    const { data: totalArticle7Days } = useQuery({
        queryKey: ["totalarticle7days"],
        queryFn: () => getTotalArticle7Days(),
    });
    const { data: totalGood } = useQuery({
        queryKey: ["totalgood"],
        queryFn: () => getTotalGoodCrawl(),
    });
    const { data: totalBad } = useQuery({
        queryKey: ["totalbad"],
        queryFn: () => getTotalBadCrawl(),
    });
    const { data: totalStatus } = useQuery({
        queryKey: ["totalstatus"],
        queryFn: () => getStatus(),
    });
    const { data: top10 } = useQuery({
        queryKey: ["top10"],
        queryFn: () => getTop10(),
    });

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Hi, Welcome back 👋
            </Typography>

            <Grid container spacing={3}>
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Total Runtime"
                        total={totalTime?.data?.TotalRunTime}
                        color="success"
                        icon={
                            <img
                                alt="icon"
                                src="/assets/icons/glass/ic_glass_bag.png"
                            />
                        }
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Total Articles"
                        total={totalArticle?.data?.TotalArticle}
                        color="info"
                        icon={
                            <img
                                alt="icon"
                                src="/assets/icons/glass/ic_glass_users.png"
                            />
                        }
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Total Good Crawl"
                        total={totalGood?.data?.TotalGoodCrawl}
                        color="warning"
                        icon={
                            <img
                                alt="icon"
                                src="/assets/icons/glass/ic_glass_buy.png"
                            />
                        }
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Total Bad Crawl"
                        total={totalBad?.data?.TotalBadCrawl}
                        color="error"
                        icon={
                            <img
                                alt="icon"
                                src="/assets/icons/glass/ic_glass_message.png"
                            />
                        }
                    />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                    <AppWebsiteVisits
                        title="Crawl Successfully"
                        subheader=""
                        chart={{
                            labels: [
                                "05/23/2024",
                                "05/24/2024",
                                "05/25/2024",
                                "05/26/2024",
                                "05/27/2024",
                                "05/28/2024",
                                "05/29/2024",
                            ],
                            series: [
                                {
                                    name: "Good",
                                    type: "line",
                                    fill: "solid",
                                    data: totalArticle7Days?.data?.Detail?.map(
                                        (obj) => obj.TotalCrawlSuccess
                                    ) || [23, 11, 22, 27, 13, 22, 37],
                                },
                            ],
                        }}
                    />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                    <AppCurrentVisits
                        title="Current Status Crawlers"
                        chart={{
                            series: [
                                {
                                    label: "Available",
                                    value:
                                        totalStatus?.data?.detail?.Available ||
                                        0,
                                },
                                {
                                    label: "Running",
                                    value:
                                        totalStatus?.data?.detail?.Running || 0,
                                },
                            ],
                        }}
                    />
                </Grid>

                <Grid xs={12} md={12} lg={12}>
                    <AppConversionRates
                        title="Top 10 Spiders with most Articles"
                        chart={{
                            series: [
                                {
                                    label: `Spider ${top10?.data?.detail?.[9]?.SpiderID}`,
                                    value: top10?.data?.detail?.[9]?.Total || 0,
                                },
                                {
                                    label: `Spider ${top10?.data?.detail?.[8]?.SpiderID}`,
                                    value: top10?.data?.detail?.[8]?.Total || 0,
                                },
                                {
                                    label: `Spider ${
                                        top10?.data?.detail?.[7]?.SpiderID || 0
                                    }`,
                                    value: top10?.data?.detail?.[7]?.Total || 0,
                                },
                                {
                                    label: `Spider ${
                                        top10?.data?.detail?.[6]?.SpiderID || 0
                                    }`,
                                    value: top10?.data?.detail?.[6]?.Total || 0,
                                },
                                {
                                    label: `Spider ${
                                        top10?.data?.detail?.[5]?.SpiderID || 0
                                    }`,
                                    value: top10?.data?.detail?.[5]?.Total || 0,
                                },
                                {
                                    label: `Spider ${
                                        top10?.data?.detail?.[4]?.SpiderID || 0
                                    }`,
                                    value: top10?.data?.detail?.[4]?.Total || 0,
                                },
                                {
                                    label: `Spider ${
                                        top10?.data?.detail?.[3]?.SpiderID || 0
                                    }`,
                                    value: top10?.data?.detail?.[3]?.Total || 0,
                                },
                                {
                                    label: `Spider ${
                                        top10?.data?.detail?.[2]?.SpiderID || 0
                                    }`,
                                    value: top10?.data?.detail?.[2]?.Total || 0,
                                },
                                {
                                    label: `Spider ${
                                        top10?.data?.detail?.[1]?.SpiderID || 0
                                    }`,
                                    value: top10?.data?.detail?.[1]?.Total || 0,
                                },
                                {
                                    label: `Spider ${
                                        top10?.data?.detail?.[0]?.SpiderID || 0
                                    }`,
                                    value: top10?.data?.detail?.[0]?.Total || 0,
                                },
                            ],
                        }}
                    />
                </Grid>
                {/* <Grid xs={12} md={6} lg={4}>
                    <AppCurrentSubject
                        title="Current Subject"
                        chart={{
                            categories: [
                                "English",
                                "History",
                                "Physics",
                                "Geography",
                                "Chinese",
                                "Math",
                            ],
                            series: [
                                {
                                    name: "Series 1",
                                    data: [80, 50, 30, 40, 100, 20],
                                },
                                {
                                    name: "Series 2",
                                    data: [20, 30, 40, 80, 20, 80],
                                },
                                {
                                    name: "Series 3",
                                    data: [44, 76, 78, 13, 43, 10],
                                },
                            ],
                        }}
                    />
                </Grid> */}
                {/* <Grid xs={12} md={12} lg={12}>
                    <AppNewsUpdate
                        title="News Update"
                        list={[...Array(5)].map((_, index) => ({
                            id: faker.string.uuid(),
                            title: faker.person.jobTitle(),
                            description: faker.commerce.productDescription(),
                            image: `/assets/images/covers/cover_${
                                index + 1
                            }.jpg`,
                            postedAt: faker.date.recent(),
                        }))}
                    />
                </Grid> */}
                {/* <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                "1983, orders, $4220",
                "12 Invoices have been paid",
                "Order #37745 from September",
                "New order placed #XF-2356",
                "New order placed #XF-2346",
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}
                {/* <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: "FaceBook",
                value: 323234,
                icon: (
                  <Iconify
                    icon="eva:facebook-fill"
                    color="#1877F2"
                    width={32}
                  />
                ),
              },
              {
                name: "Google",
                value: 341212,
                icon: (
                  <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />
                ),
              },
              {
                name: "Linkedin",
                value: 411213,
                icon: (
                  <Iconify
                    icon="eva:linkedin-fill"
                    color="#006097"
                    width={32}
                  />
                ),
              },
              {
                name: "Twitter",
                value: 443232,
                icon: (
                  <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />
                ),
              },
            ]}
          />
        </Grid> */}
                {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: "1", name: "Create FireStone Logo" },
              { id: "2", name: "Add SCSS and JS files if required" },
              { id: "3", name: "Stakeholder Meeting" },
              { id: "4", name: "Scoping & Estimations" },
              { id: "5", name: "Sprint Showcase" },
            ]}
          />
        </Grid> */}
            </Grid>
        </Container>
    );
}
