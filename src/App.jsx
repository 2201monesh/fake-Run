import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MapBox from "./components/MapBox";
import RunCard from "./components/RunCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-full items-center justify-center flex flex-col">
      <div className="w-full border-b border-black px-4 py-2">
        <p className="text-2xl">FakeRun Stats</p>
      </div>
      <div className="flex w-full h-full">
        <MapBox />
        <RunCard />
      </div>
    </div>
  );
}

export default App;
