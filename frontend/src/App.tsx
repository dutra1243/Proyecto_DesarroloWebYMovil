import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

function App() {

  const [loggedIn, logIn] = useState(false) //temp

  type ProtectedRouteProps = {
    userLoggedIn: boolean;
    children: any;
    redirectPath?: string
  }

  const ProtectedLogin = ({
    userLoggedIn,
    children,
    redirectPath = '/login'
  }: ProtectedRouteProps) => {
    if (!{ userLoggedIn }) {
      return <Navigate to={redirectPath} replace />
    }
    return children
  }


  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedLogin userLoggedIn={loggedIn}><Feed /></ProtectedLogin>
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/feed',
      element: <ProtectedLogin userLoggedIn={loggedIn}><Feed /></ProtectedLogin>
    },
    {
      path: '/profile',
      element: <ProtectedLogin userLoggedIn={loggedIn}><Profile /></ProtectedLogin>
    },
    {
      path: '/register',
      element: <Register />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
