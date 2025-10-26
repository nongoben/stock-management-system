// mui icon
import HomeIcon from "@mui/icons-material/Home";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
export const menuItems = [
  {
    key: "home",
    label: "Home",
    path: "/home",
    icon: <HomeIcon />,
  },
  {
    key: "stock",
    label: "Stock",
    path: "/stock",
    icon: <ShowChartIcon />,
  },
  {
    key: "order",
    label: "Order",
    path: "/order",
    icon: <ShoppingCartIcon />,
  },
  {
    key: "report",
    label: "Report",
    path: "/report",
    icon: <BarChartIcon />,
  },
];
