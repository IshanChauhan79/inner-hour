import React from "react";
import classes from "./App.module.css";

import { Switch, Route } from "react-router-dom";

import Header from "./Components/Header/Header";
import LIstAB from "./Components/ListAB/ListAB";
import Clock from "./Components/Clock/Clock";

function App() {
  return (
    <div className={classes.App}>
      <Header />
      <Switch>
        <Route path="/" exact>
          <LIstAB />
        </Route>
        <Route path="/clock" exact>
          <Clock />
        </Route>

        <Route path="/">
          <div className={classes.NotFound}>404 Page not Found</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

// import React from "react";
// import classes from  "./App.module.css";

// function App() {
//   return (
//     <div className={classes.App}>
//       fdmh
//     </div>
//   );
// }

// export default App;
