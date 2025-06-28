import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <>
      <header></header>
      <main className="max-w-7xl mx-auto px-4 lg:px-0">
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default RootLayout;
