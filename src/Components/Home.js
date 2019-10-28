import React from "react"
import { Route } from "react-router-dom"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"

const Home = () => {
    return (
        <React.Fragment>
            <Route render={props => (
                <NavBar {...props} />
            )} />
            <ApplicationViews />
        </React.Fragment>
    )
}

export default Home