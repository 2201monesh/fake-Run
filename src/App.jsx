import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MapBox from "./components/MapBox";
import RunCard from "./components/RunCard";
import { useAppContext } from "./context/AppContext";
import FinalScreen from "./components/FinalScreen";

function App() {
  const { submitted } = useAppContext();

  return (
    // <div className="w-full min-h-screen items-center justify-center flex flex-col">
    //   <div className="w-full border-b border-black px-4 py-2">
    //     <p className="text-2xl">FakeRun Stats</p>
    //   </div>
    //   {!submitted && (
    //     <div className="flex w-full h-full">
    //       <MapBox />
    //       <RunCard />
    //     </div>
    //   )}

    //   {submitted && (
    //     <div className="flex-grow">
    //       <FinalScreen />
    //     </div>
    //   )}
    // </div>
    <div className="w-[100%] h-[100%] flex flex-col">
      <div className="w-full border-b border-black px-4 py-2">
        <p className="text-2xl">FakeRun Stats</p>
      </div>
      <div className="flex-grow w-[100%] h-[100%]">
        {!submitted ? (
          <div className="flex w-full h-full">
            <MapBox />
            <RunCard />
          </div>
        ) : (
          <FinalScreen />
        )}
      </div>
    </div>
  );
}

export default App;
