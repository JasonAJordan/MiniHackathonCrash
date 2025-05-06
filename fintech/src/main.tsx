import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { AuthProvider } from "./config/AuthUser"


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// client/src/components/views/bananas.jsx
// Pages
import HomeContainer from './containers/HomeContainer.tsx';

// Basic pages
import ErrorPage from './views/error-page.tsx'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeContainer />, // Homepage should be here
    errorElement: <ErrorPage />
  },
]);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found. Make sure you have a div with id='root' in your index.html");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  </StrictMode>,
)
