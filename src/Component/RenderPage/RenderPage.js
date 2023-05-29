import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet }from 'react-router-dom'
import AuthForm from '../LoginForm/AuthForm'
import LoggeinPage from '../LoggedInPage/LoggeinPage'
import Inbox from '../LoggedInPage/Inbox'
import Sentmail from '../LoggedInPage/Sentmail'

export default function RenderPage() {
    const router=createBrowserRouter([
        {path:'/mailbox', element: <AuthForm/>},
        {path:'/loggedin', element: <LoggeinPage/>},
        {path:'/inbox', element: <Inbox/>},
        {path:'/sentmail', element: <Sentmail/>},
    ])
  return (
    <RouterProvider router={router} >
    <Outlet/>
</RouterProvider>
  )
}
