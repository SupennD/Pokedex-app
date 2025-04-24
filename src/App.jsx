import React from 'react';
import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/Home'; 
import Detail from './pages/Detail';
import About from './pages/About';
import Navigation from './components/Navigation';

const Layout = () => (
  <div>
    <Navigation />
    <Outlet />
  </div>
);
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/pokemon/:id', element: <Detail /> },
      { path: '/about', element: <About /> },
    ],
  },
]);


export default function App() {
  return <RouterProvider router={router} />;
}