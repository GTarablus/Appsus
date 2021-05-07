const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
import { EmailApp } from './apps/Email/pages/EmailApp.jsx';
import { KeepApp } from './apps/Keep/pages/KeepApp.jsx';
import { AppHeader } from './cmps/AppHeader.jsx';

import { Home } from './pages/Home.jsx';

export function App() {
  return (
    <Router>
      <header>
    <AppHeader/>
      </header>
      <Switch>
        <Route component={EmailApp} path="/email" />
        <Route component={KeepApp} path="/keep" />
        <Route component={Home} path="/" />
      </Switch>
    </Router>
  );
}
