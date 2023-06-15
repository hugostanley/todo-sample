import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { globals } from './config/globals.ts'
import Restricted from './components/auth/Restricted.tsx'
import Login from './pages/Login.tsx'
import Authenticate from './components/auth/Authenticate.tsx'
import Home from './pages/Home.tsx'
import Register from './pages/Register.tsx'

async function getIsLoggedIn() {
  return await JSON.parse(localStorage.getItem("isLoggedIn") || "false")
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: getIsLoggedIn,
    children: [
      {
        path: globals.FE_ENDPOINTS.LOGIN,
        element: <Restricted component={<Login />} />,
        loader: getIsLoggedIn
      },
      {
        path: globals.FE_ENDPOINTS.REGISTER,
        element: <Restricted component={<Register />} />,
        loader: getIsLoggedIn
      },
      {
        index: true,
        element: <Authenticate component={<Home />}/>,
        loader: getIsLoggedIn
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
