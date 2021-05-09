const { Link } = ReactRouterDOM;
import { NavApps } from './NavApps.jsx';
export function AppHeader() {
  return (
    <div className="app-header  main-container">
      <Link to="/">
        <div className="logo">
          <img src="./assets/img/logo.svg" alt="" />
        </div>
      </Link>

      <nav className="flex">
        <NavApps />
      </nav>
    </div>
  );
}
