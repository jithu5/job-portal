import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from "../App"
import {Home} from "../pages/index"

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                index:true,
                element:<Home/>
            }
        ]
    }
])

function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default Router
