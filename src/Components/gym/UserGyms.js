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
                    <h1>Click on a gym to view details</h1>
                    {userGyms.map((gym) => {
                        return(
                            <ul className="userGymul" key={gym.id}>
                               <li><Link to={`/gyms/${gym.id}`}>{gym.gym_name}</Link></li>
                            </ul>
                        )
                    })}
                </h2>
            </div>
        </>
    )
}

export default UserGyms
