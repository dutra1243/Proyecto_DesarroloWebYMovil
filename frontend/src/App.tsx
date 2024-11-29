import { useState } from 'react'
import { Feed } from './components/feed/Feed'
import { Login } from './components/login/Login'
import { Register } from './components/register/Register'
import { Profile } from './components/profile/Profile'
import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { useSelector } from "react-redux";

function App() {

    const token = useSelector((state: any) => state.auth.token);
    // const token = sessionStorage.getItem('token');
    const loggedIn = token !== null && token !== undefined;

    console.log({ loggedIn })
    console.log({ token })


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
        if (!userLoggedIn) {
            return <Navigate to={redirectPath} replace />
        }
        return children
    }

    const ProtectedRoute = ({
        userLoggedIn,
        children,
        redirectPath = '/'
    }: ProtectedRouteProps) => {
        if (userLoggedIn) {
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
            element: <ProtectedRoute userLoggedIn={loggedIn}><Login /></ProtectedRoute>
        },
        {
            path: '/feed',
            element: <ProtectedLogin userLoggedIn={loggedIn}><Feed /></ProtectedLogin>
        },
        {
            path: '/profile/:id',
            element: <ProtectedLogin userLoggedIn={loggedIn}><Profile /></ProtectedLogin>
        },
        {
            path: '/register',
            element: <Register />
        }
    ])
    return (
        <>
            <div className='app'>
                <RouterProvider router={router} />
            </div>
        </>
    )
}

export default App
