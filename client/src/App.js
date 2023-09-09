import { Route, useLocation, Switch } from "react-router-dom";
import { Home, Landing, Form, Detail } from "./views";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/create" component={Form} />
        <Route path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
// <Switch> ---  "react-router-dom": "^5.2.0",
// <Routes> ---  version 6