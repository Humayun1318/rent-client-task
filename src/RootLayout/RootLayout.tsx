import { Outlet } from 'react-router';
import Header from '../components/Header/Header';
import { useEffect, useState } from 'react';
import useProperty from '../contexts/PropertyContext/useProperty';

const RootLayout = () => {
  const [currentSegment, setCurrentSegment] = useState(0);
  const totalSegments = 3;
  const { selectedRole, selectedProperty, getStartedBtn } = useProperty();
  // const [startedBtn, setStartedBtn] = useState<boolean>(getStartedBtn);

  // const startedBtn = getStartedBtn;
  console.log('hefefe', selectedProperty, selectedRole);

  const handleClick = () => {
    setCurrentSegment((prev) => (prev < totalSegments ? prev + 1 : 0));
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with max-width */}
      <header className="w-full max-w-7xl mx-auto px-4 xl:px-0">
        <Header text="Exit" />
      </header>

      {/* Main content with max-width */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 xl:px-0 py-8">
        <Outlet />
      </main>

      {/* Full-width progress line container */}
      <div className="relative h-1  rounded-full">
        {/* Filled segments with gaps */}
        {[...Array(totalSegments)].map((_, i) => (
          <div
            key={i}
            className={`absolute h-full rounded-full bg-gray-200 transition-all duration-300 ${
              i < currentSegment ? 'opacity-100' : 'opacity-10'
            }`}
            style={{
              width: `calc(33.33% - 8px)`, // Each segment takes 1/3 width minus gap
              left: `${i * 33.33}%`,
            }}
          />
        ))}
      </div>

      {/* Footer with max-width */}
      <footer className="w-full max-w-7xl mx-auto px-4 xl:px-0 py-4 flex justify-between items-center">
        <button className="font-semibold underline">Back</button>
        <button
          className={`px-6 py-3 rounded-xl font-semibold text-white transition-colors
         ${
           getStartedBtn
             ? 'bg-[#316EED] hover:bg-blue-700 cursor-pointer'
             : 'bg-gray-400 opacity-70'
         }`}
          disabled={!getStartedBtn}
          onClick={handleClick}
          aria-disabled={!getStartedBtn}
        >
          Get started
        </button>
      </footer>
    </div>
  );
};

export default RootLayout;
