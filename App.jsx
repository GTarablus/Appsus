const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
import { EmailApp } from './apps/Email/pages/EmailApp.jsx';
import { KeepApp } from './apps/Keep/pages/KeepApp.jsx';

import { Home } from './pages/Home.jsx';

export function App() {
  return (
    <Router>
      <header>
        <Link to="/"> Home</Link>
        <Link to="/email"> Email</Link>
        <Link to="/keep">keep</Link>
      </header>
      <Switch>
        <Route component={EmailApp} path="/email" />
        <Route component={KeepApp} path="/keep" />
        <Route component={Home} path="/" />
      </Switch>
    </Router>
  );
}
