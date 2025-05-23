import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MapBox from "./components/MapBox";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MapBox />
    </>
  );
}

export default App;
