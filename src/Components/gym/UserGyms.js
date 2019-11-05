import React, { useEffect, useState } from "react";
import APIManager from "../modules/APIManager";
import { Link } from "react-router-dom"

const UserGyms = props => {

    const [userGyms, setUserGyms] = useState([])

    const getUserGyms = () => {
        APIManager.getAll("gyms/usergyms").then(response => setUserGyms(response))
    }

    useEffect(()=>{
        getUserGyms()
    }, [])

    return(
        <>
            <div className="userGyms">
                <h2 className="userGymsHeader">
                    {userGyms.map((gym) => {
                        return(
                            <div className="userGymDiv" key={gym.id}>
                            <h1>Click on a gym to view details</h1>
                               <Link to={`/gyms/${gym.id}`}>{gym.gym_name}</Link>
                            </div>
                        )
                    })}
                </h2>
            </div>
        </>
    )
}

export default UserGyms
