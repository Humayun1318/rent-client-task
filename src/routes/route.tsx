import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import RootLayout from '../RootLayout/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div>Errore element!!!!!!!!!!!!!!</div>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

export default router;
