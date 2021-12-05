import { Switch, Route } from "react-router-dom";

import Users from "../users/Users";
import Dashboard from "./Dashboard";
import UserInfo from "../users/UserInfo";
import ProfileInfo from "../users/ProfileInfo";

const DashRouting = ({ AuthTokenValues, removecookies }) => {
  return (
    <>
      <Switch>
        <Route exact path={`/dashboard/home/:username`}>
          {/* <Redirect to="/dashboard/home" /> */}
          <Dashboard />
        </Route>

        <Route exact path="/dashboard/home/userinfo/:username/:id/:aId">
          <UserInfo />
        </Route>

        <Route exact path="/dashboard/home/profileinfo/:id">
          <ProfileInfo removecookies={removecookies} />
        </Route>

        <Route exact path="/dashboard/home/:username/chatlist/:type/:id/:aId">
          <Users />
        </Route>
      </Switch>
    </>
  );
};

export default DashRouting;
