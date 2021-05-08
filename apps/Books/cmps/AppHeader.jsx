
const { NavLink } = ReactRouterDOM
export function AppHeader(){
    return <div className="header-content container">
        <div className="logo">
            <img src="../assets/img/logo.png" alt=""/>
        </div>
        <nav>
            <ul className="clean-list">
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink exact to="/book">Books</NavLink></li>
                <li><NavLink exact to ="/about">About Us</NavLink></li>
            </ul>
        </nav>
    </div>
}