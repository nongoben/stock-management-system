// mui icon
import HomeIcon from "@mui/icons-material/Home";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
export const menuItems = [
  {
    key: "home",
    label: "หน้าหลัก",
    path: "/home",
    icon: <HomeIcon />,
  },
  {
    key: "stock",
    label: "สต็อกสินค้า",
    path: "/stock",
    icon: <ShowChartIcon />,
  },
  {
    key: "order",
    label: "คำสั่งซื้อ",
    path: "/order",
    icon: <ShoppingCartIcon />,
  },
  {
    key: "report",
    label: "รายงาน",
    path: "/report",
    icon: <BarChartIcon />,
  },
];
