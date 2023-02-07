import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import SummarizeIcon from "@mui/icons-material/Summarize";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import InputIcon from "@mui/icons-material/Input";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleIcon from "@mui/icons-material/People";

export const pageList = [
  {
    title: "Overview",
    pathName: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    title: "ตรวจสอบข้อมูลรายเดือน",
    pathName: "/monthly",
    icon: <InputIcon />,
  },
  {
    title: "ออกรายงาน",
    pathName: "/issuereport",
    icon: <DescriptionOutlinedIcon />,
  },

  {
    title: "สมาชิกในระบบ",
    pathName: "/member",
    icon: <ApartmentIcon />,
  },
  {
    title: "จัดการผู้ใช้งานระบบ",
    pathName: "/user",
    icon: <PeopleIcon />,
  },
];
