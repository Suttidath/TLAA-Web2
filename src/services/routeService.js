import { Route, Routes } from "react-router-dom";
import { browserHistory } from "../index";
import Overview from "../pages/Overview";
import Monthly from "../pages/Monthly/Monthly";
import Issuereport from "../pages/Issuereport/Issuereport";
import Member from "../pages/Member/Member";
import Addmember from "../pages/Member/Addmember";
import Editmember from "../pages/Member/Editmember";
import User from "../pages/User/User";
import Adduser from "../pages/User/Adduser";
import Edituser from "../pages/User/Edituser";
import MonthlyEdit from "../pages/Monthly/Editmonthly";

export default function RouteService() {
  if (window.location.pathname === "/")
    return (window.location.pathname = "/dashboard");
  return (
    <Routes history={browserHistory}>
      <Route path={"/dashboard"} element={<Overview />} />
      <Route path={"/monthly"} element={<Monthly />} />
      <Route path={"/issuereport"} element={<Issuereport />} />
      <Route path={"/member"} element={<Member />} />
      <Route path={"/member/addmember"} element={<Addmember />} />
      <Route path={"/member/editmember/:id"} element={<Editmember />} />
      <Route path={"/user"} element={<User />} />
      <Route path={"/user/adduser"} element={<Adduser />} />
      <Route path={"/user/edituser/:id"} element={<Edituser />} />
      <Route path={"/monthly/editdata/:id"} element={<MonthlyEdit />} />
    </Routes>
  );
}
