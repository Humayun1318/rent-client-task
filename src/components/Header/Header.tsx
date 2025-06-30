import { useLocation, useNavigate } from 'react-router';

const Header = ({ text }: { text: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between border-b-1 border-b-gray-200 py-4">
      <div className="w-[150px] h-[40px]" onClick={() => navigate('/')}>
        <img
          src="./logo.png"
          alt="logo"
          className="w-full h-full  object-contain cursor-pointer"
        />
      </div>
      <div className="border border-gray-200 px-6 py-3 font-semibold">
        <button
          onClick={() => navigate('/')}
        >{`${location.pathname !== '/' ? 'Save & Exit' : `${text}`}`}</button>
      </div>
    </div>
  );
};

export default Header;
