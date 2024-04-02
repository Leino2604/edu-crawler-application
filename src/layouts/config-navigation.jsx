import SvgColor from "../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
    <SvgColor
        src={`/assets/icons/navbar/${name}.svg`}
        sx={{ width: 1, height: 1 }}
    />
);

const navConfig = [
    {
        title: "dashboard",
        path: "/",
        icon: icon("ic_analytics"),
    },
    {
        title: "spider",
        path: "/spider",
        icon: icon("ic_lock"),
    },
    {
        title: "website spider",
        path: "/websitespider",
        icon: icon("ic_lock"),
    },
    {
        title: "webpage spider",
        path: "/webpagespider",
        icon: icon("ic_lock"),
    },
    {
        title: "user",
        path: "/user",
        icon: icon("ic_user"),
    },
    {
        title: "article",
        path: "/article",
        icon: icon("ic_blog"),
    },
    {
        title: "Not found",
        path: "/404",
        icon: icon("ic_disabled"),
    },
];

export default navConfig;
