import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet }from 'react-router-dom'
import AuthForm from '../LoginForm/AuthForm'
import LoggeinPage from '../LoggedInPage/LoggeinPage'

export default function RenderPage() {
    const router=createBrowserRouter([
        {path:'/', element: <AuthForm/>},
        {path:'/loggedin', element: <LoggeinPage/>},
    ])
  return (
    <RouterProvider router={router} >
    <Outlet/>
</RouterProvider>
  )
}
