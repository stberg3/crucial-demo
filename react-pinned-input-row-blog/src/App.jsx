import React, { useState, useCallback } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Grid from './Grid.jsx';
import User from './User.jsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Grid />,    
  },
  {
      path: "/user/:userId",
      element: <User />,
      loader: async ({ params }) => { return fetch(`/users/${params.userId}`); },
  },
]);

// const App = () => {
//    <RouterProvider router={router} />
// };

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
