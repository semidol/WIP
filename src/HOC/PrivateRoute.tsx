import { Navigate } from "react-router-dom"
import { useAppSelector } from "../hooks";

interface PrivateRouteProps {
   children: JSX.Element,
   forWhom: 'authUser' | 'notAuthUser'
}

export default function PrivateRoute({children, forWhom}:PrivateRouteProps) {
    const isAuth = useAppSelector((state) => state.user.isAuth);
    
    if (!isAuth && forWhom === 'authUser') {
      return <Navigate to='/login' />
    }

		if (isAuth && forWhom === 'notAuthUser') {
			return <Navigate to='/' />
		}

  	return children
}