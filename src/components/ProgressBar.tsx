import { useState } from 'react';

const ProgressBar = () => {
  const [currentSegment, setCurrentSegment] = useState(0);
  const totalSegments = 3;

  const handleClick = () => {
    setCurrentSegment((prev) => (prev < totalSegments ? prev + 1 : 0));
  };

  return (
    <div className="p-8">
      {/* Progress line container */}
      <div className="relative h-4  rounded-full">
        {/* Filled segments with gaps */}
        {[...Array(totalSegments)].map((_, i) => (
          <div
            key={i}
            className={`absolute h-full rounded-full bg-gray-200 transition-all duration-300 ${
              i < currentSegment ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: `calc(33.33% - 4px)`, // Each segment takes 1/3 width minus gap
              left: `${i * 33.33}%`,
            }}
          />
        ))}
      </div>

      {/* Click button */}
      <button
        onClick={handleClick}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >ssss
        {/* {currentSegment === totalSegments ? 'Reset' : 'Add Segment'} */}
      </button>
    </div>
  );
};

export default ProgressBar;
