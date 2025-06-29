import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import RootLayout from '../RootLayout/RootLayout';
import CondominiumsInfo from '../pages/CondominiumsInfo';

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
      {
        path: 'condominiums',
        element: <CondominiumsInfo />,
      },
    ],
  },
]);

export default router;
