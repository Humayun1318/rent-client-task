const ProgressBar = ({ totalSegments }: { totalSegments: number }) => {
  return (
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
  );
};

export default ProgressBar;
