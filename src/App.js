// import react, { useEffect, useState } from "react";
import Main from "./components/Main";
import Explore from "./views/Explore";
import Types from "./views/Types";
import Home from "./views/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Main>
        <Switch>
          <Route exact path="/" component={Home}>
            {/* <Home /> */}
          </Route>
          <Route exact path="/explore" component={Explore}>
            <Explore />
          </Route>
          <Route exact path="/types" component={Types}>
            {/* <Types /> */}
          </Route>
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
