import { StateContextProvider } from "./client/Context/StateContext";
import Login from "./client/pages/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Workspace from "./client/pages/Workspace/Workspace";
import Home from "./client/pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <StateContextProvider>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/swit/home" component={Home} />
            <Route path="/swit/channel/:workspaceId" component={Workspace} />
          </Switch>
        </StateContextProvider>
      </Router>
    </div>
  );
}

export default App;
