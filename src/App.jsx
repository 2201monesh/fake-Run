import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MapBox from "./components/MapBox";
import RunCard from "./components/RunCard";
import { useAppContext } from "./context/AppContext";
import FinalScreen from "./components/FinalScreen";

function App() {
  const { submitted, setSubmitted } = useAppContext();

  const handleClick = () => {
    setSubmitted(false);
  };

  return (
    <div className="w-[100%] h-[100%] flex flex-col bg-[#F9FAFB]">
      <div className="w-full h-[10vh] border-b border-black px-4 py-2 flex items-center justify-between bg-[#FFFFFF]">
        <p className="text-2xl">FakeRun Stats</p>
        {submitted && (
          <button
            className="bg-black text-white px-2 py-1 cursor-pointer rounded"
            onClick={handleClick}
          >
            Back to Home
          </button>
        )}
      </div>
      <div className="flex-grow w-[100%] h-[100%]">
        {!submitted ? (
          <div className="flex w-full h-[90vh] flex-col lg:flex-row gap-4 p-4">
            <div className="w-full lg:w-[70%] h-[55%] lg:h-full">
              <MapBox />
            </div>
            <div className="w-full lg:w-[30%] h-[45%] lg:h-full">
              <RunCard />
            </div>
          </div>
        ) : (
          <FinalScreen />
        )}
      </div>
    </div>
  );
}

export default App;

{
  /* <div className="flex w-full h-full flex-col lg:flex-row">
            <MapBox />
            <RunCard />
          </div> */
}
