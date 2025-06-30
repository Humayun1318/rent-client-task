import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import RootLayout from '../RootLayout/RootLayout';
import CondominiumsInfo from '../pages/CondominiumsInfo';
import Payment from '../pages/Payment';

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
      {
        path: 'payment',
        element: <Payment />,
      },
    ],
  },
]);

export default router;
