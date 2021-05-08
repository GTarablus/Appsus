const { NavLink } = ReactRouterDOM
import { NavApps} from './NavApps.jsx';
export function AppHeader() {
    return <div className="app-header  main-container">
        <div className="logo">
            <img src="" alt="" />
            <h1>Apsus</h1>
        </div>
    
        <nav className="flex">
        <NavApps/>       
        </nav>
    </div>
     }