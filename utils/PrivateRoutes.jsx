/* v8 ignore start */

import { Outlet, Navigate } from "react-router-dom"
import Cookies from "js-cookie"
const PrivateRoutes = () => {

    const token=Cookies.get('jwtToken')
    // localStorage.getItem('')
    const checkToken = token && token?.length > 0
    let auth = { 'token': checkToken }
    return (
        auth.token ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoutes

/* v8 ignore stop */
