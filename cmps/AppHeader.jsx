const { NavLink } = ReactRouterDOM
import {IconApps} from './IconApps.jsx';
export function AppHeader() {
    return <div className="app-header  main-container">
        <div className="logo">
            <img src="" alt="" />
            <h1>Apsus</h1>
        </div>
        <nav>
            {/* <IconApps/> */}
            <ul className="clean-list">
           <li> <NavLink to="/"> Home</NavLink></li>
        <li><NavLink to="/email"> Email</NavLink></li>
        <li> <NavLink to="/keep">Keep</NavLink></li>
        <li> <NavLink to="/keep">Books</NavLink></li>
        <li> <NavLink to="/keep">About</NavLink></li>
            </ul>
        </nav>
    </div>
     }