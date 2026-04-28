import { Navigate, Outlet } from 'react-router-dom'
import { UserNav } from '../components/UserNav'
// import { useContext, useEffect } from 'react'
// import { AuthContext } from '../context/AuthContext'
export const PrivateRoutes_P = ({ userData, logOutUser }) => {
    // Context may be in use if needed later
    // let userData = useContext(AuthContext);

    return (
        <div className='h-screen'>
            <main className='h-90% w-screen'>
                {/* {console.log(userData.isLogedIn)} */}
                {/* {userData.isLogedIn === "" && <h1>Loading........</h1>} */}
                {!userData.isLogedIn && <Navigate to='/login' />}
                {userData.isLogedIn && <Outlet />}
            </main>
            <UserNav logOutUser={logOutUser}>Nav Bar icons</UserNav>
        </div>
    )
}


