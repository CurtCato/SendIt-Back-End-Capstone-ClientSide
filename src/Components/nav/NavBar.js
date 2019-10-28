import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const NavBar = props => {
    const { isAuthenticated, logout } = useSimpleAuth()

    return (
        <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow navbar1">
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>

            </ul>
        </nav>
    )
}

export default NavBar