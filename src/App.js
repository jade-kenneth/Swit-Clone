import { StateContextProvider } from "./client/Context/StateContext";
import Login from "./client/pages/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Workspace from "./client/pages/Workspace/Workspace";

function App() {
  return (
    <div className="App">
      <Router>
        <StateContextProvider>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/api/channel" component={Workspace} />
          </Switch>
        </StateContextProvider>
      </Router>
    </div>
  );
}

export default App;
