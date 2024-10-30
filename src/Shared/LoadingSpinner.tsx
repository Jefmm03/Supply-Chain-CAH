import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-48 h-16">
        <div className="absolute w-5 h-5 bg-red-600 rounded-full left-[15%] origin-center animate-circle"></div>
        <div className="absolute w-5 h-5 bg-red-600 rounded-full left-[45%] origin-center animate-circle delay-100"></div>
        <div className="absolute w-5 h-5 bg-red-600 rounded-full right-[15%] origin-center animate-circle delay-200"></div>

        <span className="absolute top-[75px] left-[15%] text-[20px] tracking-[12px] font-lato">Loading</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
