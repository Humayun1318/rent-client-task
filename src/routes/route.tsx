import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Main Layout</div>,
    errorElement: <div>Errore element!!!!!!!!!!!!!!</div>,
    children: [
      {
        path: '/',
        element: <div>Home</div>,
      },
    ],
  },
]);

export default router;
