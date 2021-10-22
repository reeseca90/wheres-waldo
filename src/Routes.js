// this will be used for multiple pictures

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import blank from './blank';
import Hockey from './Hockey';
import './Routes.css';

const Routes = () => {
  
  return (
    <BrowserRouter>
      <div id="mainContent">
        <div id="imageLinks">
          <Link to="/">Home</Link>
          <Link to="/hockey">Hockey</Link>
        </div>

        <Switch>
          <Route exact path="/" component={blank} />
          <Route exact path="/hockey" component={Hockey} />
        </Switch>
      </div>
    </BrowserRouter>
    );
};

export default Routes;