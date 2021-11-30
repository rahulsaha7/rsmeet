import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Redirect,
  } from "react-router-dom";
  import DashRouting from "../Dashboard/DashRouting";
  import Users from "../users/Users";

  const Routing = () =>{
      return (
         <>
              <Switch>
                  <Route exact path = "/routing/home" >
                        {/* <DashRouting /> */}
                        <h1>testing here</h1>
                  </Route>
                
                    <Route  exact path="/routing/home/:id">
                        <Users />
                    </Route>

                  <Route exact path = '/routing' >
                    <Redirect to="/routing/home" />
                  </Route>
              </Switch>
          </>
      )
  }

  export default Routing