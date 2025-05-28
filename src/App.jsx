import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MapBox from "./components/MapBox";
import RunCard from "./components/RunCard";
import { useAppContext } from "./context/AppContext";

function App() {
  const { submitted } = useAppContext();

  return (
    <div className="w-full h-full items-center justify-center flex flex-col">
      <div className="w-full border-b border-black px-4 py-2">
        <p className="text-2xl">FakeRun Stats</p>
      </div>
      {!submitted && (
        <div className="flex w-full h-full">
          <MapBox />
          <RunCard />
        </div>
      )}

      {submitted && <p>hello</p>}
    </div>
  );
}

export default App;
