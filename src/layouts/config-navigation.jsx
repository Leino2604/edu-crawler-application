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
    title: "crawler",
    path: "/crawler",
    icon: icon("ic_bug_report"),
  },
  {
    title: "user",
    path: "/user",
    icon: icon("ic_user"),
  },
  // {
  //   title: "product",
  //   path: "/products",
  //   icon: icon("ic_cart"),
  // },
  // {
  //   title: "blog",
  //   path: "/blog",
  //   icon: icon("ic_blog"),
  // },
  {
    title: "login",
    path: "/login",
    icon: icon("ic_lock"),
  },
  {
    title: "register",
    path: "/register",
    icon: icon("ic_lock"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: icon("ic_disabled"),
  },
];

export default navConfig;
