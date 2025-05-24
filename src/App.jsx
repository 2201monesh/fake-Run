import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MapBox from "./components/MapBox";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-full items-center justify-center flex flex-col">
      <div className="w-full border-b border-black px-4 py-2">
        <p className="text-2xl">FakeRun Stats</p>
      </div>
      <div className="flex w-full h-full">
        <MapBox />
        <div className="w-[40%] h-[80%] border m-4">hello</div>
      </div>
    </div>
  );
}

export default App;
