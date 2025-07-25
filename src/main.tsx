import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './routes/route';
import PropertyProvider from './contexts/PropertyContext/PropertyProvider';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PropertyProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </PropertyProvider>
  </StrictMode>
);
