import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import AuthHandler from './AuthHandler.tsx'
import Login from './Components/Login.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthHandler />,
    children: [
      {
        path: '',
        element: <App />,
      }
    ]
  },
  {
    path: '/login',
    element:<Login />
  }
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
