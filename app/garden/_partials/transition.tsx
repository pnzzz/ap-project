import React from "react";
import tw from "tailwind-styled-components";

const TransitionScreen = ({ day, isVisible }: { day: number, isVisible: boolean }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-background transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <h1 className="text-4xl font-bold">Day {day}</h1>
    </div>
  );
};

export default TransitionScreen;