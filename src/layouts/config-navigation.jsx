import SvgColor from "../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
    <SvgColor
        src={`/assets/icons/navbar/${name}.svg`}
        sx={{ width: 1, height: 1 }}
    />
);

const result = localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : null;

var navConfig;
if (result?.Role === "Admin") {
    navConfig = [
        {
            title: "dashboard",
            path: "/",
            icon: icon("ic_analytics"),
        },
        {
            title: "user",
            path: "/user",
            icon: icon("ic_user"),
        },
        {
            title: "article",
            path: "/article",
            icon: icon("ic_article"),
        },
        {
            title: "spider",
            path: "/spider",
            icon: icon("ic_spider"),
        },
        {
            title: "website spider",
            path: "/websitespider",
            icon: icon("ic_spider"),
        },
        {
            title: "webpage spider",
            path: "/webpagespider",
            icon: icon("ic_spider"),
        },
        {
            title: "keyword",
            path: "/keyword",
            icon: icon("ic_keyword"),
        },
        {
            title: "file",
            path: "/file",
            icon: icon("ic_file"),
        },
        {
            title: "file type",
            path: "/filetype",
            icon: icon("ic_filetype"),
        },
    ];
} else {
    navConfig = [
        {
            title: "dashboard",
            path: "/",
            icon: icon("ic_analytics"),
        },
        {
            title: "article",
            path: "/article",
            icon: icon("ic_article"),
        },
        {
            title: "spider",
            path: "/spider",
            icon: icon("ic_spider"),
        },
        {
            title: "website spider",
            path: "/websitespider",
            icon: icon("ic_spider"),
        },
        {
            title: "webpage spider",
            path: "/webpagespider",
            icon: icon("ic_spider"),
        },
        {
            title: "file",
            path: "/file",
            icon: icon("ic_file"),
        },
    ];
}

export default navConfig;
